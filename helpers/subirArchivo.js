const { v4: uuidv4 } = require('uuid')
const path = require('path')



const subirArchivo = (files, extensionesPermitidas = ['png', 'jpg', 'jpeg', 'gif'], carpeta = '') => {


    return new Promise((resolve, rejects )=> {

        const { archivo } = files


        const nombreCortado = archivo.name.split('.')
        const extension = nombreCortado[nombreCortado.length - 1]

        if (!extensionesPermitidas.includes(extension)) {
            return rejects(`la extension ${extension} no es permitida, - ${extensionesPermitidas}`)
        }

        const nombreTemp = uuidv4() + '.' + extension
        const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTemp)

        archivo.mv(uploadPath, (err) => {
            if (err) {
                rejects(err)
            }
            resolve(nombreTemp)
        })

    })


}

module.exports = {
    subirArchivo
}
