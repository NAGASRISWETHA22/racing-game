const Road = ({ roadPos }) => (
  <>
    {[0, 200, 400, 600, 800].map(top => (
      <div key={top} className="road-line" style={{ top: (roadPos + top) % 1000 - 100 + 'px' }} />
    ))}
  </>
);
export default Road;