const Title = ({ user }) => (
  <>
    <h1
      style={{ textAlign: 'center', marginBottom: '30px', marginTop: '30px' }}
    >
      Welcome to online C/C++ compiler,
    </h1>
    <h2
      style={{ textAlign: 'center', marginBottom: '30px', marginTop: '30px' }}
    >{`${user.email}!`}</h2>
  </>
);

export default Title;
