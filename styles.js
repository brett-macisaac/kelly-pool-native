import { StyleSheet, Dimensions } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

const gHeightHeader = 50;
const gHeightFooter = 80;

// const gHeightScreen = Dimensions.get("window").height;

// const gSafeAreaPadding = useSafeAreaInsets();

// const gVertPaddingSafe = gSafeAreaPadding.top + gSafeAreaPadding.bottom;
// console.log("Safe Area Padding: " + gVertPaddingSafe);

// const gHeightContent = gHeightScreen - (gVertPaddingSafe + gHeightFooter + gHeightHeader);

const gFontSizeStandard = 16;

const gColourPage = "#323241";

const keyProperties = {
    heightHeader: gHeightHeader,
    heightFooter: gHeightFooter,
    // heightScreen: gHeightScreen,
    // heightContent: gHeightContent,
    fontSizeStandard: gFontSizeStandard,
    spacingStandard: 30,
    colourPage: gColourPage,
    maxWidthGrid: 300,
};

const styles = StyleSheet.create(
    {
        pageContainer:
        {
            width: "100%",
            backgroundColor: gColourPage
        },

        header:
        {
            alignItems: "flex-start",
            justifyContent: "center",
            width: "100%",
            height: gHeightHeader,
            paddingLeft: Math.floor(gFontSizeStandard * 1.5),
            backgroundColor: "#000"

            /*
            display: flex;
            align-items: center;
            justify-content: flex-start;

            width: 100%;
            height: var(--height-header);

            font-size: 25px;

            padding-left: 1.25em;

            background-color: var(--colour-button);
            */
        },
        headerText: 
        {
            fontSize: Math.floor(gFontSizeStandard * 1.5),
            fontWeight: 600,
            color: "#FFF"
        },

        content:
        {
            flexGrow: 1,
            width: "100%",
            alignItems: 'center',
            fontSize: gFontSizeStandard,
            paddingBottom: 30,
            /*    
                height: calc(100vh - var(--height-footer) - var(--height-header));
                width: 100%;
                overflow: scroll;

                margin: auto !important;

                font-size: 16px;

                padding-bottom: 30px; 
            */
        },

        footer:
        {
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            backgroundColor: "#000",
            height: gHeightFooter

            /*
            .footer
            {
                display: flex;
                align-items: center;
                justify-content: center;
                
                width: 100%;

                background-color: black;

                height: var(--height-footer);
            }
            */
        },

        title:
        {
            textAlign: "center",
            fontSize: Math.floor(gFontSizeStandard * 1.25),
            fontWeight: 600,
            marginTop: keyProperties.spacingStandard,
            marginBottom: Math.floor(keyProperties.spacingStandard / 2),
            color: "#FFF"
        },
        /*
        h2
        {
            text-align: center;

            font-size: 20px;

            margin-top: 30px;
            margin-bottom: 15px;
        }
        */

        btnBig:
        {
            width: "90%",
            maxWidth: 500,
            alignItems: "center",
            padding: 10,
            backgroundColor: "#000",
            borderRadius: 5
            
            /*
            display: block;

            width: 90%;
            max-width: 500px;

            margin: auto;

            padding: 10px 0;

            background-color: var(--colour-button);

            font-size: 20px;
            font-weight: 600;

            border: 1px solid var(--colour-button);
            border-radius: 20px;
            */
        },
        btnBigText:
        {
            fontSize: Math.floor(gFontSizeStandard * 1.25),
            fontWeight: 600,
            color: "#FFF",
        },

        btnFooter:
        {
            backgroundColor: gColourPage,
        },
        btnFooterText:
        {
            color: "#FFF",
        }
        /* 
        #btnNext, #btnStart
        {
            background-color: var(--colour-page);
            color: white;
        }
        */



    }
);

export { styles, keyProperties };