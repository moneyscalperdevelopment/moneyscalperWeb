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
    <section className="py-20 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Features & Benefits
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need for successful crypto trading
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-card/50 backdrop-blur-sm rounded-lg border border-border/50 overflow-hidden"
        >
          <Table>
            <TableHeader>
              <TableRow className="border-border/50 hover:bg-muted/30">
                <TableHead className="text-lg font-semibold">Feature</TableHead>
                <TableHead className="text-lg font-semibold">Description</TableHead>
                <TableHead className="text-center text-lg font-semibold">Available</TableHead>
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
                  <TableCell className="font-medium">{feature.name}</TableCell>
                  <TableCell className="text-muted-foreground">{feature.description}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                        <Check className="w-4 h-4 text-primary" />
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
