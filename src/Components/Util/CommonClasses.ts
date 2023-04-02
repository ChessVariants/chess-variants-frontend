import { makeStyles } from '@material-ui/core/styles';
import CustomDarkTheme from './CustomDarkTheme';

const commonClasses = makeStyles({
    BasicCard: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '1.8em',
    },

    CenteredBasicCard: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '1.8em',
        position: 'absolute',
        left: '50%',
        top: '50%',
        webkitTransform: 'translate(-50%, -50%)',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
    },
    CustomButton: {
        background: CustomDarkTheme.palette.primary.main + '!important',
        '&:hover': {
            backgroundImage: 'linear-gradient(90deg,' + CustomDarkTheme.palette.primary.dark + ', ' + CustomDarkTheme.palette.primary.main + ' 100%)!important',
        },
    },
});

/*
.button-43:hover {
  background-image: linear-gradient(-180deg, #1D95C9 0%, #17759C 100%);
}
*/

export { commonClasses };