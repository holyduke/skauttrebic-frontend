import axios from "axios";

export default class UploadAdapter {
    constructor( loader ) {
        // The file loader instance to use during the upload.
        this.loader = loader;
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
                        // resolve(response.data[0].url);
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
        // Update the loader's progress.
        // server.onUploadProgress( data => {
        //     loader.uploadTotal = data.total;
        //     loader.uploaded = data.uploaded;
        // } );

        // Return a promise that will be resolved when the file is uploaded.
        // return loader.file
            // .then( file => server.upload( file ) );
    }

    // Aborts the upload process.
    abort() {
        // Reject the promise returned from the upload() method.
        // server.abortUpload();
    }
}