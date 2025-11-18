import { Article } from "./ArticleGrid";
import { Clock } from "lucide-react";

interface ArticleCardProps {
  article: Article;
}

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    Bitcoin: "bg-cyber-orange/10 text-cyber-orange border-cyber-orange/20",
    Ethereum: "bg-electric-blue/10 text-electric-blue border-electric-blue/20",
    Strategy: "bg-neon-cyan/10 text-neon-cyan border-neon-cyan/20",
    "On-chain": "bg-neon-violet/10 text-neon-violet border-neon-violet/20",
    DeFi: "bg-cyber-green/10 text-cyber-green border-cyber-green/20",
  };
  return colors[category] || "bg-primary/10 text-primary border-primary/20";
};

const ArticleCard = ({ article }: ArticleCardProps) => {
  return (
    <article className="group relative rounded-xl overflow-hidden border border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-cyber hover:border-primary/30 cursor-pointer">
      {/* Image */}
      <div className="relative aspect-[16/9] overflow-hidden bg-muted">
        <img 
          src={article.image} 
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(article.category)}`}>
            {article.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-3">
        <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
          {article.title}
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {article.excerpt}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-3 pt-2 text-xs text-muted-foreground">
          <span>{article.date}</span>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{article.readTime}</span>
          </div>
        </div>
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      </div>
    </article>
  );
};

export default ArticleCard;
