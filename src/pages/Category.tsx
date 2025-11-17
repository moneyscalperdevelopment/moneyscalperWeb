import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Category = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  
  const formattedCategory = categoryName
    ? categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
    : "Category";

  return (
    <div className="relative min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          {formattedCategory}
        </h1>
        <p className="text-muted-foreground">
          Browse our {categoryName} collection. More products coming soon.
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default Category;
