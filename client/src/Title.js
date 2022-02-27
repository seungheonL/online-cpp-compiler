const Title = ({ user }) => (
  <>
    <h1
      style={{
        textAlign: 'center',
        marginBottom: '30px',
        marginTop: '30px',
        fontFamily: 'League Gothic',
        fontSize: '50px',
      }}
    >
      Welcome to online C/C++ compiler,
    </h1>
    <h2
      style={{
        textAlign: 'center',
        marginBottom: '30px',
        marginTop: '30px',
        fontFamily: 'Poppins',
      }}
    >{`${user.email}!`}</h2>
  </>
);

export default Title;
