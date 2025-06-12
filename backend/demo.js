const fileInput = document.getElementById("fileInput")

    fileInput.addEventListener("change",function(evt){
        const file = evt.target.files[0]
    
       const reader = new FileReader()
    
       reader.onload = function(evt){
        const data = evt.target.result
        const workbook = XLSX.read(data, {type:"binary"})
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        const emailList = XLSX.utils.sheet_to_json(worksheet,{header: 'A'})
        const totalemail = emailList.map(function(item){return item.A})
        console.log(totalemail)
        setEmailList(totalemail)
    
       }
    
       reader.readAsBinaryString(file)
    
    
    })