const Output = ({ result }) => {
  return (
    <div className="form-group">
      <textarea
        spellCheck="false"
        rows="40"
        style={{
          width: '180%',
          backgroundColor: '#212121',
          color: '#A4A4A4',
          fontFamily: 'consolas',
        }}
        className="form-control"
        value={result}
      ></textarea>
    </div>
  );
};

export default Output;
