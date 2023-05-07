import { useNavigate } from "react-router-dom";
import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import CreateIcon from '@mui/icons-material/Create';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import CustomDarkTheme from "./CustomDarkTheme";
import { Link } from "@mui/material";
import CookieService, { Cookie } from "../../Services/CookieService";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

const CustomListItem = (props: { text: string, open: any, icon: any, url: string, clickFunction?: any }) => {
    const navigate = useNavigate();
    return (<ListItem key={props.text} disablePadding sx={{ display: 'block' }}>
        <ListItemButton
            sx={{
                minHeight: 48,
                justifyContent: props.open ? 'initial' : 'center',
                px: 2.5,
            }}
            onClick={() => { navigate(props.url); props.clickFunction() }}
        >
            <ListItemIcon
                sx={{
                    minWidth: 0,
                    mr: props.open ? 3 : 'auto',
                    justifyContent: 'center',
                }}
            >
                {props.icon}
            </ListItemIcon>
            <ListItemText primary={props.text} sx={{ opacity: props.open ? 1 : 0 }} />
        </ListItemButton>
    </ListItem >)
}

export default function NavBar() {

    const cookieService = CookieService.getInstance()

    const logout = () => {
        cookieService.remove(Cookie.Username); 
        cookieService.remove(Cookie.JwtToken); 
        window.location.reload();
    }

    const navigate = useNavigate();

    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box>
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Link variant="h6" onClick={() => navigate("/")} tabIndex={0} sx={{ letterSpacing: "4px" }} underline="none" component="button" color="text.primary">
                        CHESS VARIANTS
                    </Link>
                </Toolbar>
            </AppBar >
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    <CustomListItem text={"JOIN GAME"} open={open} icon={<PlayCircleOutlineIcon sx={{ color: CustomDarkTheme.palette.joinColor.main }} />} url={"/join"}></CustomListItem>
                    <CustomListItem text={"CREATE GAME"} open={open} icon={<AddCircleOutlineIcon sx={{ color: CustomDarkTheme.palette.createColor.main }} />} url={"/new"}></CustomListItem>
                    <CustomListItem text={"VARIANT EDITOR"} open={open} icon={<CreateIcon sx={{ color: CustomDarkTheme.palette.editorColor.main }} />} url={"/pieceEditor"}></CustomListItem>
                    <CustomListItem text={"BROWSER"} open={open} icon={<FormatListBulletedIcon sx={{ color: CustomDarkTheme.palette.browserColor.main }} />} url={"/browse"}></CustomListItem>
                </List>
                <Divider />
                <List>
                    <CustomListItem text={"LOG OUT"} open={open} icon={<LogoutIcon />} url={""} clickFunction={logout}></CustomListItem>
                </List>
            </Drawer>
        </Box >
    );
}

