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
      Welcome to online C/C++ compiler, {`${user.email}!`}
    </h1>
  </>
);

export default Title;
