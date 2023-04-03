import { StyleSheet, Platform, Dimensions } from 'react-native';

const gHeightHeader = 50;
const gHeightFooter = 80;

const gFontSizeStandard = 16;

const gColourPage = "#323241";

const gWidthScreen = Dimensions.get("screen").width;

const gMaxWidthContainer = 500;

const gWidthCon = gWidthScreen * 0.9 > gMaxWidthContainer ? gMaxWidthContainer : gWidthScreen * 0.9;

const keyProperties = {
    heightHeader: gHeightHeader,
    heightFooter: gHeightFooter,
    fontSizeStandard: gFontSizeStandard,
    spacingStandard: 30,
    colourPage: gColourPage,
    widthCon: gWidthCon,
    widthGridPoolBall: gWidthCon * 0.8,
    borderRadiusStandard: 5,
    colourSelected: "#7c6a04",
    fontFamilyMono: Platform.OS === "ios" ? "Courier New" : "monospace"
};

const styles = StyleSheet.create(
    {
        pageContainer:
        {
            flex: 1,
            width: "100%",
            backgroundColor: gColourPage
        },

        content:
        {
            flexGrow: 1,
            width: "100%",
            alignItems: 'center',
            paddingBottom: 1.5 * keyProperties.spacingStandard,
        },

        footer:
        {
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            backgroundColor: "#000",
            height: gHeightFooter
        },

        conGeneral:
        {
            width: keyProperties.widthCon,
            backgroundColor: "#444455",
            padding: 15,
            borderRadius: 2 * keyProperties.borderRadiusStandard,
        },

        title:
        {
            textAlign: "center",
            fontSize: Math.floor(gFontSizeStandard * 1.25),
            fontWeight: 600,
            marginBottom: Math.floor(keyProperties.spacingStandard / 2),
            color: "#FFF"
        },

        btnBig:
        {
            width: "90%",
            maxWidth: 500,
            alignItems: "center",
            padding: 10,
            backgroundColor: "#000",
            borderRadius: keyProperties.borderRadiusStandard
        },
        btnBigText:
        {
            fontSize: Math.floor(gFontSizeStandard * 1.25),
            fontWeight: 600,
            color: "#FFF",
        }
    }
);

export { styles, keyProperties };