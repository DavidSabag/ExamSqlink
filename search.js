const fs = require('fs');
const path = require('path');

const isStringExistInFile = (filePath,searchString) =>{
	//check if text exist in file.
	//rerurn: true/false.
	//filePath: path of the file.
	//searchString: value to be searched.
	return fs.readFileSync(filePath).indexOf(searchString) >= 0;	
}

const getFilesFromDir = (dir,ext,txt) => {
   //runs through all the files in the directory and subdirectories with recursion
   //and shows the full path of the files with the extension and text given.
   //dir: main directory path.
   //ext: file extention.
   //txt: text to be searched in file
  let flag = false;
  const dirRunner = (currentPath,ext,txt) => {
    const files = fs.readdirSync(currentPath);
    
    files.forEach(( file ) => {
      const curFile = path.resolve(currentPath, file);      
      if (fs.statSync(curFile).isFile()){ 
        	if(file.includes('.' + ext) && isStringExistInFile(curFile,txt) ){
        		console.log(curFile);
        		flag = true;
        	}

      } 
      if (fs.statSync(curFile).isDirectory()) {
       		dirRunner(curFile,ext,txt);
      }
    });
  }

  dirRunner(dir,ext,txt);
  if(!flag){
  	console.log('No file was found');
  }
}

//handling inputs from command line
const rl = require('readline');
const inputs = process.argv.map( (elem) => {elem});
let count = 0;  		
for (var elem in inputs){count++;}
if(count === 2){
  	console.log('USAGE: node search [EXT] [TEXT]');
}
if(count === 3){
  	console.log('Not enough arguments'); 	
}
if(count > 4){
  	console.log('Only 2 arguments allowed'); 		
}
if(count === 4){
	const [ , , ext, txt] = process.argv;
	getFilesFromDir("./",ext,txt);	
}



