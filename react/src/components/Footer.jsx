export default function Footer() {
  return (
    <footer style={styles.footer}>
      <p>&copy; {new Date().getFullYear()} Все права защищены</p>
    </footer>
  );
}

const styles = {
  footer: {
    marginTop: "auto",
    padding: "20px",
    backgroundColor: "#F2EADF",
    color: "#8A3D42",
    textAlign: "center",
  },
  link: {
    color: "white",
    textDecoration: "none",
  },
};
