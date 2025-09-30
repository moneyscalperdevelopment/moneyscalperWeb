const InteractiveNebulaBackground = () => {
  return (
    <>
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-950 z-0" />

      {/* Foggy mist overlays */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-pulse" 
             style={{ animationDuration: '8s' }} />
        <div className="absolute top-1/3 right-1/4 w-[30rem] h-[30rem] bg-slate-900/20 rounded-full blur-[140px] animate-pulse" 
             style={{ animationDuration: '10s', animationDelay: '2s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] animate-pulse" 
             style={{ animationDuration: '12s', animationDelay: '4s' }} />
      </div>

      {/* Vignette effect */}
      <div className="absolute inset-0 z-[3] bg-gradient-radial from-transparent via-transparent to-slate-950/60 pointer-events-none" />
    </>
  );
};

export default InteractiveNebulaBackground;
