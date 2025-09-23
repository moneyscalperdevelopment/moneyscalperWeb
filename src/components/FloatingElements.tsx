const FloatingElements = () => {
  const elements = [
    { id: 1, icon: "₿", size: "text-4xl", position: "top-20 left-20", delay: "0s" },
    { id: 2, icon: "Ξ", size: "text-3xl", position: "top-40 right-32", delay: "1s" },
    { id: 3, icon: "◆", size: "text-2xl", position: "top-60 left-1/3", delay: "2s" },
    { id: 4, icon: "▲", size: "text-xl", position: "bottom-40 right-20", delay: "1.5s" },
    { id: 5, icon: "●", size: "text-lg", position: "bottom-60 left-40", delay: "0.5s" },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {elements.map((element) => (
        <div
          key={element.id}
          className={`absolute ${element.position} ${element.size} text-primary/20 floating-element cyber-glow`}
          style={{ animationDelay: element.delay }}
        >
          {element.icon}
        </div>
      ))}
      
      {/* Geometric shapes */}
      <div className="absolute top-32 right-40 w-16 h-16 border-2 border-accent/30 rotate-45 floating-element" style={{ animationDelay: "2.5s" }} />
      <div className="absolute bottom-32 left-60 w-12 h-12 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full floating-element" style={{ animationDelay: "1.8s" }} />
      <div className="absolute top-1/2 left-20 w-8 h-20 bg-gradient-to-b from-primary/10 to-transparent transform rotate-12 floating-element" style={{ animationDelay: "3s" }} />
    </div>
  );
};

export default FloatingElements;