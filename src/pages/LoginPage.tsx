import Login from "../components/Login";
import Header from "../components/Header";

type LoginPageProps = {
  checkToken: () => void;
};

function LoginPage({ checkToken }: LoginPageProps) {
  return (
    <div>
      <Header />
      <Login checkToken={checkToken} />
    </div>
  );
}

export default LoginPage;
