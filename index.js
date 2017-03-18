const fs                 = require('fs');
const Subtitle           = require('subtitle');
const englishSub         = fs.readFileSync('./subtitles.srt', 'utf8');
const russianSub         = fs.readFileSync('./sub_rus.srt', 'utf8');
let englishSerializedSub = getSerializeSub(englishSub);
let russianSerializedSub = getSerializeSub(russianSub);

englishSerializedSub = englishSerializedSub.reduce(subtitleReduce, '');
russianSerializedSub = russianSerializedSub.reduce(subtitleReduce, '');

const html = `<!DOCTYPE html>
<html lang="en">
	<head>
	<meta charset="UTF-8">
	<title>Title</title>
	</head>
	<body>
		<div style='width: 50%; float:left;'>${englishSerializedSub}</div>
		<div style='width: 50%; float:left;'>${russianSerializedSub}</div>
	</body>
	</html>`;

fs.writeFileSync('./parsedSubtitles.html', html);

function getSerializeSub(subfile) {
	var captions = new Subtitle();

	captions.parse(subfile);
	return captions.getSubtitles();
}

function subtitleReduce(accumulator, currentValue, index) {
	const paragraph = `\n${currentValue.text}<br/>`;
	const count     = `\n${index + 1}<br/>`;

	accumulator = accumulator.concat(`${count} ${paragraph}`);

	return accumulator
}