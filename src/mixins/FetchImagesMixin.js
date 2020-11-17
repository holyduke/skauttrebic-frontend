export default {
   methods: {
      getImageUrlFormatOrLower(image, desiredFormat) {
         if (desiredFormat == "large") {
            if (image.formats[desiredFormat].url) {
               return image.formats[desiredFormat].url;
            }
            else desiredFormat = "medium";
         }
         if (desiredFormat == "medium") {
            if (image.formats[desiredFormat].url) {
               return image.formats[desiredFormat].url;
            }
            else desiredFormat = "small";
         }
         if (desiredFormat == "small") {
            if (image.formats[desiredFormat].url) {
               return image.formats[desiredFormat].url;
            }
            else desiredFormat = "thumbnail";
         }
         if (desiredFormat == "thumbnail") {
            if (image.formats[desiredFormat].url) {
               return image.formats[desiredFormat].url;
            }
         }

         return image.url;   //default image without size adjustment
      }
   },
};