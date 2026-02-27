import cover1 from "@/assets/ai-blog/1.png";
import cover2 from "@/assets/ai-blog/2.png";
import cover3 from "@/assets/ai-blog/3.png";
import cover4 from "@/assets/ai-blog/4.png";
import cover5 from "@/assets/ai-blog/5.png";
import cover6 from "@/assets/ai-blog/6.png";
import cover7 from "@/assets/ai-blog/7.png";
import cover8 from "@/assets/ai-blog/8.png";
import cover9 from "@/assets/ai-blog/9.png";
import cover10 from "@/assets/ai-blog/10.png";
import cover11 from "@/assets/ai-blog/11.png";
import cover12 from "@/assets/ai-blog/12.png";
import cover13 from "@/assets/ai-blog/13.png";
import cover14 from "@/assets/ai-blog/14.png";
import cover15 from "@/assets/ai-blog/15.png";
import cover16 from "@/assets/ai-blog/16.png";
import cover17 from "@/assets/ai-blog/17.png";
import cover18 from "@/assets/ai-blog/18.png";
import cover19 from "@/assets/ai-blog/19.png";
import cover20 from "@/assets/ai-blog/20.png";

const aiBlogCoverByKey: Record<string, string> = {
  "1": cover1,
  "2": cover2,
  "3": cover3,
  "4": cover4,
  "5": cover5,
  "6": cover6,
  "7": cover7,
  "8": cover8,
  "9": cover9,
  "10": cover10,
  "11": cover11,
  "12": cover12,
  "13": cover13,
  "14": cover14,
  "15": cover15,
  "16": cover16,
  "17": cover17,
  "18": cover18,
  "19": cover19,
  "20": cover20,
};

export const getAiBlogCoverImage = (coverKey: string): string =>
  aiBlogCoverByKey[coverKey] || cover1;
