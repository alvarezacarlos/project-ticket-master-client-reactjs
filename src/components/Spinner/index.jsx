import { FadeLoader } from 'react-spinners'


import styles from './Spinner.module.css'


const Spinner = ({ isLoading } ) => { 
  return (
    <div className={styles.spinnerContainer} onLoad={isLoading}>
      <FadeLoader color="#36d7b7"/>
    </div>
  );
};

export default Spinner;
