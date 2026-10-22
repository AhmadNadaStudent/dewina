import Wizard from './pages/Wizard';
import DDCExplorer from './pages/DDCExplorer';
import History from './pages/History';
import CaseStudies from './pages/CaseStudies';
import Home from './pages/Home';
import About from './pages/About';
import __Layout from './Layout.jsx';

export const PAGES = {
    "Home": Home,
    "Wizard": Wizard,
    "DDCExplorer": DDCExplorer,
    "History": History,
    "CaseStudies": CaseStudies,
    "About": About,
};

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};
