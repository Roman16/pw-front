import _ from "lodash"
import XLSX from "xlsx"

export const saveFile = (file, type) => {
    // if (type === 'csv') {
    //     saveAsCsv(file)
    // } else if (type === 'xls' || type === 'xlsx') {
        saveAsExcel(file, type)
    // }
}

export const saveInputParameters = (objs, name='input-parameters') => {
    const textFile = _makeTextFile(JSON.stringify(objs, null, 2))
    const link = document.createElement('a')
    link.download = `${name}.json`
    link.href = textFile
    const el = document.querySelector('body')
    el.appendChild(link)
    link.click()
    el.removeChild(link)
}

export const saveGoogleSpreadsheet = (apiResponse) => {
// generate XLSX workbook
    const workbook = XLSX.utils.book_new()
    apiResponse.xlsxWorkBook.sheets.forEach(x => {
        const sheet = XLSX.utils.json_to_sheet(x.jsonData, {skipHeader: true})
        XLSX.utils.book_append_sheet(workbook, sheet, x.name)
    })

// save workbook to user file system
    const workbookFilename = `${apiResponse.xlsxWorkBook.name}.xlsx`
    XLSX.writeFile(workbook, workbookFilename)
}

export const saveSpreadsheet = (res) => {
    // generate XLSX workbook
    const workbook = XLSX.utils.book_new()
    res.sheets.forEach(x => {
        const sheet = XLSX.utils.json_to_sheet(x.jsonData, {skipHeader: true})
        XLSX.utils.book_append_sheet(workbook, sheet, x.name)
    })

// save workbook to user file system
    const workbookFilename = `${res.name}.xlsx`
    XLSX.writeFile(workbook, workbookFilename)
}

const saveAsExcel = (bulksheet, type) => {
    const workbook = XLSX.utils.book_new()

    bulksheet.allSheets.forEach(sheet => {
        const sheetDataAsArrays = sheet
            .csvContent
            .split(sheet.rowSeparator)
            .map(row =>
                row.split(sheet.fieldSeparator)
                    .map(column => _.isString(column) && column.length === 0 ? null : column),
            )

        const worksheet = XLSX.utils.aoa_to_sheet(sheetDataAsArrays)

        // xlsx sheet name can't be longer than 31 characters
        const truncatedSheetName = sheet.name.substring(0, 31)
        XLSX.utils.book_append_sheet(workbook, worksheet, truncatedSheetName)
    })

    saveWorkbook(workbook, bulksheet.name, type)
}

const saveAsCsv = (doc) => {
    let textFile = ''

    doc.allSheets.forEach(sheet => {
        textFile = textFile + _makeTextFile(sheet.csvContent)
    })

    const link = document.createElement('a')
    link.download = `${doc.name}.csv`
    link.href = textFile
    const el = document.querySelector('body')
    el.appendChild(link)
    link.click()
    el.removeChild(link)
}

const _makeTextFile = (text) => {
    const data = new Blob([text], {type: 'text/plain'})
    const textFile = window.URL.createObjectURL(data)
    return textFile
}

const saveWorkbook = (workbook, name, extension) => {
    XLSX.writeFile(workbook, `${name}.${extension}`)
}

