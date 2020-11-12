import axios from "axios";
import store from '@/store/store'

export default class UploadAdapter {
    constructor( loader ) {
        // The file loader instance to use during the upload.
        this.loader = loader;
        this._id = "";
    }

    // Starts the upload process.
    upload() {
        return this.loader.file
            .then( file => new Promise( ( resolve, reject ) => {
                let formData = new FormData();
                console.log("uploading new file -", file);
                formData.append("files", file);
                axios.post("/upload", formData, {"Content-Type": "multipart/form-data",})
                    .then((response) => {
                        console.log("file upload successfull", response);
                        this._id = response.data[0]._id;
                        store.dispatch("appendPostImages", this._id);
                        resolve( {
                            default: response.data[0].url
                        } );
                    })
                    .catch(function (e) {
                        console.log("upload image FAILURE!!");
                        reject("image reject");
                        console.log(e);
                    });
            }));
    }

    abort() {
        console.log("aborting............");
    }
}