
export const generateSupplyChainResponse = (userMessage: string): string => {
  const lower = userMessage.toLowerCase();
  
  if (lower.includes('supplier') && lower.includes('analysis')) {
    return "Based on the supplier analysis request, I've identified key performance metrics including delivery reliability (94.2%), cost efficiency (87.5%), and quality scores (96.8%). Top-performing suppliers show consistent lead times and competitive pricing. I recommend consolidating orders with suppliers achieving >90% reliability scores while developing backup options for critical materials.";
  }
  
  if (lower.includes('inventory') && lower.includes('planning')) {
    return "For inventory planning optimization, I've analyzed demand patterns showing seasonal peaks in Q2 and Q4. Recommended safety stock levels: 15% for Class A items, 25% for Class B, and 35% for Class C. Implementation of ABC analysis suggests focusing 80% of inventory management efforts on your top 20% revenue-generating SKUs.";
  }
  
  if (lower.includes('capacity') && lower.includes('planning')) {
    return "Capacity analysis reveals current utilization at 78% with bottlenecks in packaging operations. To handle projected 25% demand increase, consider: 1) Adding second shift in packaging (immediate), 2) Equipment upgrade for 30% throughput improvement, 3) Cross-training workforce for flexibility. ROI analysis shows payback period of 14 months for recommended investments.";
  }
  
  if (lower.includes('sourcing') && (lower.includes('optimization') || lower.includes('option'))) {
    return "Sourcing optimization analysis identified 3 alternative suppliers with 15-20% cost savings potential. Risk assessment shows geographical diversification reduces supply chain vulnerability by 35%. Recommended strategy: 70% primary supplier, 20% secondary, 10% spot market for flexibility. Implementing vendor scorecards will improve performance monitoring.";
  }
  
  if (lower.includes('warehouse') && lower.includes('optimization')) {
    return "Warehouse optimization study reveals 23% efficiency improvement potential through layout restructuring. Key recommendations: 1) Implement zone picking reducing travel time by 35%, 2) ABC positioning placing fast-movers within 50ft of shipping, 3) Automated sorting system for 40% throughput increase. Expected ROI: 18 months with 28% operational cost reduction.";
  }
  
  if (lower.includes('logistics') || lower.includes('distribution')) {
    return "Distribution network analysis suggests hub consolidation reducing transportation costs by 22%. Optimal strategy combines regional distribution centers with last-mile delivery partnerships. Route optimization algorithms show 18% reduction in delivery times and 15% fuel cost savings. Consider implementing dynamic routing based on real-time traffic and demand patterns.";
  }
  
  return "That's an insightful supply chain question! Based on current industry best practices and data analytics, I can help you optimize your operations through strategic planning, risk mitigation, and performance improvements. Would you like me to dive deeper into any specific aspect of your supply chain operations?";
};
