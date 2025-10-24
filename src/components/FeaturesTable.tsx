import { motion } from "motion/react";
import { Check } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const features = [
  { name: "Scalper Engine", description: "High-frequency trading optimization" },
  { name: "AI-Driven Strategy", description: "Machine learning-powered decisions" },
  { name: "Multi-Asset Support", description: "BTC, ETH, and 50+ cryptocurrencies" },
  { name: "Real-Time Analytics", description: "Live dashboards and insights" },
  { name: "Low Fees", description: "Competitive rates, no hidden charges" },
  { name: "Secure Wallets", description: "Military-grade encryption" },
];

const FeaturesTable = () => {
  return (
    <section className="py-10 sm:py-12 md:py-16 lg:py-20 px-3 sm:px-4 md:px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 md:mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent px-3 py-2 sm:py-3">
            Features & Benefits
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg px-3">
            Everything you need for successful crypto trading
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-card/50 backdrop-blur-sm rounded-lg border border-border/50 overflow-x-auto"
        >
          <Table>
            <TableHeader>
              <TableRow className="border-border/50 hover:bg-muted/30">
                <TableHead className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold whitespace-nowrap px-3 sm:px-4">Feature</TableHead>
                <TableHead className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold hidden sm:table-cell px-3 sm:px-4">Description</TableHead>
                <TableHead className="text-center text-xs sm:text-sm md:text-base lg:text-lg font-semibold whitespace-nowrap px-3 sm:px-4">Available</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {features.map((feature, index) => (
                <motion.tr
                  key={feature.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="border-border/50 hover:bg-muted/30 transition-colors"
                >
                  <TableCell className="font-medium text-xs sm:text-sm md:text-base px-3 sm:px-4 py-3 sm:py-4">{feature.name}</TableCell>
                  <TableCell className="text-muted-foreground text-xs sm:text-sm md:text-base hidden sm:table-cell px-3 sm:px-4">{feature.description}</TableCell>
                  <TableCell className="text-center px-3 sm:px-4">
                    <div className="flex justify-center">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary/20 flex items-center justify-center">
                        <Check className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                      </div>
                    </div>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesTable;
