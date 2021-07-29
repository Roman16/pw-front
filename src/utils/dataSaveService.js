import _ from 'lodash';

export class dataSaveService {
    saveInputParameters = (objs) => {
        const textFile = this._makeTextFile(JSON.stringify(objs, null, 2));
        const link = document.createElement('a');
        link.download = `input-parameters.json`;
        link.href = textFile;
        const el = document.querySelector('body');
        el.appendChild(link);
        link.click();
        el.removeChild(link);
    }

     _makeTextFile = (text) => {
        const data = new Blob([text], { type: 'text/plain' });
        const textFile = window.URL.createObjectURL(data);
        return textFile;
    }
}
