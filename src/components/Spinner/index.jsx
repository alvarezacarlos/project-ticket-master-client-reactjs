import { FadeLoader } from 'react-spinners'


import styles from './Spinner.module.css'


const Spinner = () => { 
  return (
    <div className={styles.spinnerContainer}>
      <FadeLoader color="#36d7b7"/>
    </div>
  );
};

export default Spinner;
