import styles from './NotFoundBlock.module.scss';

function NotFoundBlock() {
  return (
    <div className={styles.root}>
      <span>😕</span>
      <br />
      <h1>Ничего не найдено</h1>
      <p className={styles.description}>Такой страницы не существует, проверьте адрес страницы</p>
    </div>
  );
}

export default NotFoundBlock;
