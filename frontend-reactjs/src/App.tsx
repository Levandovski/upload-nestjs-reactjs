import Layout from './layouts';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
const App: React.FC = () => {
  return (
    <>
      <ToastContainer />
      <Layout />
    </>
  );
};
export default App;
