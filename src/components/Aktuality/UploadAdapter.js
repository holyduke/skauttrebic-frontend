import axios from "axios";
import store from '@/store/store'
import FetchImagesMixin from "@/mixins/FetchImagesMixin";

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
                        store.dispatch("appendPostImages", response.data[0]);
                        const image_url = FetchImagesMixin.methods.getImageUrlFormatOrLower(response.data[0], "large");
                        console.log("desired image url", image_url);
                        resolve( {
                            default: image_url
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