const fs  = require('fs');
var validator = require('validator');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});
 
//buat folder
const dirPath = './data';
const dataPath = './data/contacts.json';
//cek folder sudah ada atau tidak, jika tidak buat folder
if (!fs.existsSync(dirPath)){
  fs.mkdirSync(dirPath);
}
//cek file sudah ada atau tidak, jika tidak buat file
if(!fs.existsSync(dataPath)){
  fs.writeFileSync(dataPath, '[]', 'utf-8');
}

//buat fungsi pertanyaan
function pertanyaan(question){
 return new Promise((resolve) =>{
  readline.question(question, (answer)=>{
    resolve(answer);
  })
 })
}

const main = async () =>{
  let nama = await pertanyaan('Nama : ');
  let nomor = await pertanyaan('Nomor : ');
  let email = await pertanyaan('email : ');
  while(!validator.isMobilePhone(nomor, 'id-ID')){
    console.log('Format Nomor Salah!')
    nomor = await pertanyaan('Nomor : ');
  }
  while(!validator.isEmail(email)){
    console.log('Format Email Salah')
    email = await pertanyaan('email : ');
  }
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8',));
    data.push({nama, nomor, email});
    fs.writeFileSync(dataPath, JSON.stringify(data));
    readline.close();
    console.log("Data Tersimpan")
}

main();
  
