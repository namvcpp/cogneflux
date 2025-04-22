/**
 * Extracts Manim code blocks from text
 */
export function extractManimCode(text: string): string | null {
  // Pattern to match code blocks: ```python ... ``` or ```manim ... ``` 
  const pythonPattern = /```(?:python|manim)([\s\S]*?)```/g;
  
  // First try to find blocks specifically labeled as python or manim
  const pythonMatches = [...text.matchAll(pythonPattern)];
  if (pythonMatches.length > 0) {
    // Look for a block that contains Manim imports or Scene class
    const manimBlock = pythonMatches.find(match => 
      match[1].includes('manim') || 
      match[1].includes('Scene') || 
      match[1].includes('from manim import')
    );
    
    if (manimBlock) {
      return manimBlock[1].trim();
    }
    
    // If no specific Manim block found but we have Python blocks, return the first one
    return pythonMatches[0][1].trim();
  }
  
  // If no python blocks found, try to find any code block
  const genericPattern = /```([\s\S]*?)```/g;
  const genericMatches = [...text.matchAll(genericPattern)];
  
  if (genericMatches.length > 0) {
    // Filter to find blocks that look like Manim code
    const possibleManimBlocks = genericMatches.filter(match => 
      match[1].includes('Scene') || 
      match[1].includes('manim') ||
      match[1].includes('self.play') ||
      match[1].includes('import')
    );
    
    if (possibleManimBlocks.length > 0) {
      return possibleManimBlocks[0][1].trim();
    }
  }
  
  return null;
}

/**
 * Checks if text likely contains Manim-related content
 */
export function containsManimContent(text: string): boolean {
  const manimKeywords = [
    'manim', 'Scene', 'self.play', 'Animation', 
    'from manim import', '3Blue1Brown', '3b1b',
    'mathematical animation'
  ];
  
  return manimKeywords.some(keyword => text.toLowerCase().includes(keyword.toLowerCase()));
}
