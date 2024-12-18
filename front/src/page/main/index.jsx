import Nav from '@cmp/nav'
import Footer from '@cmp/footer'

const Main = () => {
  return (
    <main className="page">
      <Nav list={[1,2,3]}/>
      Main
      <Footer/>
    </main>
  );
};

export default Main;
