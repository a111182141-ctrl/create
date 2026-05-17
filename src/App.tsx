/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { 
  Mail, 
  Linkedin, 
  Instagram, 
  Youtube, 
  Facebook, 
  MessageCircle, 
  Menu, 
  X, 
  Search,
  ChevronRight,
  ExternalLink,
  BookOpen,
  Anchor,
  Laptop,
  CheckCircle2,
  Calendar,
  GraduationCap,
  Box
} from "lucide-react";
import React, { useState, useEffect } from "react";

// --- Types ---
interface TimelineItemProps {
  year: string;
  title: string;
  subtitle?: string;
  description?: string[];
  type?: 'education' | 'experience';
}

interface Skill {
  name: string;
  level?: string;
}

// --- Components ---

const Section = ({ title, children, id }: { title: string; children: React.ReactNode; id?: string }) => (
  <motion.section 
    id={id}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    className="py-20 border-b border-editorial-ink/10 last:border-0"
  >
    <div className="flex flex-col gap-6">
      <h2 className="text-5xl font-sans font-black text-transparent bg-clip-text bg-gradient-to-r from-vibrant-primary to-vibrant-accent leading-none tracking-tight">
        {title}
      </h2>
      <div className="w-20 h-2 bg-gradient-to-r from-vibrant-primary to-vibrant-accent rounded-full" />
      <div className="mt-4">
        {children}
      </div>
    </div>
  </motion.section>
);

const TimelineItem = ({ year, title, subtitle, description, type = 'experience' }: TimelineItemProps) => (
  <div className="flex gap-8 mb-12 last:mb-0 group">
    <div className="flex flex-col items-center">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${type === 'experience' ? 'from-vibrant-primary to-pink-600 shadow-pink-200' : 'from-vibrant-secondary to-cyan-600 shadow-cyan-200'} text-white shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}>
        {type === 'experience' ? <Anchor size={24} /> : <GraduationCap size={24} />}
      </div>
      <div className="w-1.5 h-full bg-slate-100 rounded-full my-4" />
    </div>
    <div className="flex-1 pb-12">
      <div className="flex items-center gap-4 mb-3">
        <span className="px-3 py-1 bg-slate-100 rounded-full text-xs font-sans font-black text-slate-500 uppercase tracking-widest">{year}</span>
        <div className="h-px flex-1 bg-slate-100" />
      </div>
      <h3 className="text-3xl font-sans font-black text-slate-800 mb-2 leading-tight">{title}</h3>
      {subtitle && <p className="text-base font-sans font-bold text-vibrant-primary bg-vibrant-primary/5 px-3 py-1 rounded-lg inline-block mb-6">{subtitle}</p>}
      {description && (
        <ul className="space-y-4">
          {description.map((item, idx) => (
            <li key={idx} className="flex items-start gap-4 text-slate-600 text-lg leading-relaxed font-medium">
              <div className="mt-2 w-2 h-2 bg-vibrant-accent rounded-full shrink-0 shadow-sm shadow-vibrant-accent/40" />
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
);

interface ProjectCardProps {
  title: string;
  icon: any;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, icon: Icon, onClick }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.02, y: -5 }}
    className="flex items-center justify-between p-8 bg-white rounded-3xl border-2 border-slate-50 shadow-xl shadow-slate-200/40 transition-all hover:border-vibrant-primary/20 group overflow-hidden relative text-left w-full"
  >
    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-vibrant-primary/5 to-transparent rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150" />
    <div className="flex items-center gap-6 relative z-10">
      <div className="p-4 bg-vibrant-primary/10 text-vibrant-primary rounded-2xl group-hover:bg-vibrant-primary group-hover:text-white transition-all">
        <Icon size={28} />
      </div>
      <span className="text-2xl font-sans font-black text-slate-800 tracking-tight">{title}</span>
    </div>
    <ChevronRight className="text-slate-200 group-hover:text-vibrant-primary transition-all group-hover:translate-x-2" />
  </motion.button>
);

const ProjectModal = ({ project, isOpen, onClose }: { project: any; isOpen: boolean; onClose: () => void }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/80 backdrop-blur-xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-5xl bg-white rounded-[40px] shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col"
          >
            {/* Modal Header */}
            <div className="bg-white flex justify-between items-center px-10 py-6 border-b border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-vibrant-primary rounded-xl flex items-center justify-center text-white">
                  {project.icon && <project.icon size={20} />}
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-800 leading-none mb-1">{project.title}</h3>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{project.subtitle}</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center hover:bg-vibrant-primary hover:text-white transition-all group"
              >
                <X size={20} className="group-hover:rotate-90 transition-transform" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-10 overflow-y-auto">
              {project.content}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const SkillBadge: React.FC<{ skill: string; level?: string }> = ({ skill, level }) => (
  <div className="px-6 py-3 bg-white border-2 border-slate-50 rounded-2xl shadow-md shadow-slate-100 text-sm font-sans font-black uppercase tracking-widest transition-all hover:scale-105 hover:shadow-lg hover:border-vibrant-secondary/20 hover:text-vibrant-secondary">
    {skill}
    {level && (
      <span className="ml-2 text-slate-400 font-bold">/ {level}</span>
    )}
  </div>
);

// --- Main App ---

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeProject, setActiveProject] = useState<any>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const projectsContent = [
    {
      id: 1,
      title: "新竹清明連假企劃",
      subtitle: "山林露營 × 客家食光",
      icon: Laptop,
      content: (
        <div className="space-y-12">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <div className="inline-block px-4 py-1 bg-vibrant-secondary/10 rounded-full text-[10px] font-black uppercase tracking-widest text-vibrant-secondary">
                Family Trip Planning
              </div>
              <h4 className="text-5xl font-black text-slate-900 tracking-tighter leading-[0.95]">
                新竹清明<br/>連假行程
              </h4>
              <p className="text-lg font-bold text-slate-500 border-l-4 border-vibrant-primary pl-5">
                全家 4 人專屬：4 天 3 夜深度慢活之旅
              </p>
            </div>
            <div className="aspect-video bg-slate-100 rounded-[30px] overflow-hidden">
               <img src="https://res.klook.com/image/upload/w_750,h_469,c_fill,q_85/activities/hrnfwps4hz0nbwledqyo.jpg" className="w-full h-full object-cover" alt="Hsinchu" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-50 p-6 rounded-[25px] space-y-4 border border-white">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-vibrant-primary text-white rounded-lg flex items-center justify-center font-black text-sm">01</div>
                <h5 className="text-lg font-black text-slate-800">Day 1：前進山林雲海</h5>
              </div>
              <ul className="space-y-3 text-slate-600 font-bold text-sm">
                <li className="flex gap-2"><span>12:30</span> <span>竹東「阿瑛潤餅」或「包Sir水餃」</span></li>
                <li className="flex gap-2"><span>15:00</span> <span>抵達尖石：免裝備豪華露營</span></li>
                <li className="flex gap-2"><span>18:00</span> <span>星空晚餐：頂級 BBQ 圓桌套餐</span></li>
              </ul>
              <div className="pt-3 border-t border-slate-200 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-vibrant-primary">
                <span>Budget</span>
                <span>$12,000 / 4人</span>
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-[25px] space-y-4 border border-white">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-vibrant-secondary text-white rounded-lg flex items-center justify-center font-black text-sm">02</div>
                <h5 className="text-lg font-black text-slate-800">Day 2：步道與景觀大菜</h5>
              </div>
              <ul className="space-y-3 text-slate-600 font-bold text-sm">
                <li className="flex gap-2"><span>11:00</span> <span>青蛙石天空步道散步</span></li>
                <li className="flex gap-2"><span>12:30</span> <span>宇老景觀：馬告土雞午餐</span></li>
                <li className="flex gap-2"><span>18:30</span> <span>市區晚宴：老港陳風味</span></li>
              </ul>
              <div className="pt-3 border-t border-slate-200 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-vibrant-secondary">
                <span>Budget</span>
                <span>$8,400 / 4人</span>
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-[25px] space-y-4 border border-white">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-vibrant-accent text-white rounded-lg flex items-center justify-center font-black text-sm">03</div>
                <h5 className="text-lg font-black text-slate-800">Day 3：海岸夕陽魅力</h5>
              </div>
              <ul className="space-y-3 text-slate-600 font-bold text-sm">
                <li className="flex gap-2 text-vibrant-accent"><span>Morning</span> <span>北埔老街：擂茶文化體驗</span></li>
                <li className="flex gap-2 text-vibrant-accent"><span>Afternoon</span> <span>南寮：魚鱗天梯夕陽</span></li>
              </ul>
              <div className="pt-3 border-t border-slate-200 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-vibrant-accent">
                <span>Budget</span>
                <span>$10,000 / 4人</span>
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-[25px] space-y-4 border border-white">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-800 text-white rounded-lg flex items-center justify-center font-black text-sm">04</div>
                <h5 className="text-lg font-black text-slate-800">Day 4：美食伴手禮</h5>
              </div>
              <ul className="space-y-3 text-slate-600 font-bold text-sm">
                <li className="flex gap-2"><span>10:00</span> <span>新竹動物園城市探險</span></li>
                <li className="flex gap-2"><span>12:00</span> <span>廟口小吃：鴨香飯、燕丸</span></li>
                <li className="flex gap-2"><span>14:00</span> <span>必買：福源、水蒸蛋糕</span></li>
              </ul>
              <div className="pt-3 border-t border-slate-200 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                <span>Budget</span>
                <span>$3,500 / 4人</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 p-10 rounded-[35px] text-white text-center shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-48 h-48 bg-vibrant-primary opacity-20 blur-[80px] pointer-events-none" />
             <div className="text-5xl font-black tracking-tighter mb-2">$33,900</div>
             <div className="text-vibrant-secondary font-black text-sm uppercase tracking-widest mb-4">Total Family Budget</div>
             <div className="text-slate-400 font-bold">
                人均 NTD $8,475 / 4天3夜
             </div>
          </div>
        </div>
      )
    },
    { 
      id: 2, 
      title: "清明連假詳細計畫 (Word)", 
      subtitle: "Detailed Itinerary", 
      icon: BookOpen, 
      content: (
        <div className="space-y-10">
          <div className="border-b border-slate-100 pb-8">
            <h4 className="text-3xl font-black text-slate-900 mb-4 tracking-tighter">【新竹清明連假】<br/><span className="text-vibrant-primary">山林露營 × 客家食光</span></h4>
            <p className="text-slate-500 font-bold">4 人行程表全記錄</p>
          </div>

          <div className="space-y-12">
            <div>
              <h5 className="text-sm font-black uppercase tracking-[0.2em] text-vibrant-secondary mb-6 flex items-center gap-3">
                <div className="w-6 h-1 bg-vibrant-secondary rounded-full" />
                4/3 (五) 第一天：前進山林雲海
              </h5>
              <div className="grid gap-4 pl-9 relative">
                <div className="absolute left-3 top-0 bottom-0 w-px bg-slate-100" />
                <div className="bg-white p-5 rounded-2xl border-2 border-slate-50 shadow-sm relative">
                  <div className="absolute -left-[30px] top-6 w-4 h-4 rounded-full bg-slate-200 border-4 border-white shadow-sm" />
                  <div className="text-xs font-black text-slate-400 mb-2 uppercase tracking-widest">Itinerary</div>
                  <ul className="space-y-3 text-slate-700 font-bold text-base">
                    <li>11:00 出發，目標竹東市區。</li>
                    <li>12:30 午餐：竹東「阿瑛潤餅」或「包Sir水餃」（簡單吃，留肚子給晚餐）。</li>
                    <li>15:00 抵達營地：推薦尖石鄉的「免裝備豪華露營」（如：愛上喜翁或相思園）。</li>
                    <li>18:00 星空晚餐：營區提供的豪華烤肉 BBQ 圓桌套餐。</li>
                  </ul>
                  <div className="mt-4 pt-4 border-t border-slate-50 text-vibrant-primary font-black text-xs">
                    EST. COST: 帳棚 (4人) 約 $10,000 + 餐費 $2,000 = $12,000
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h5 className="text-sm font-black uppercase tracking-[0.2em] text-vibrant-primary mb-6 flex items-center gap-3">
                <div className="w-6 h-1 bg-vibrant-primary rounded-full" />
                4/4 (六) 第二天：森林芬多精 × 景觀圓桌菜
              </h5>
              <div className="grid gap-4 pl-9 relative">
                <div className="absolute left-3 top-0 bottom-0 w-px bg-slate-100" />
                <div className="bg-white p-5 rounded-2xl border-2 border-slate-50 shadow-sm relative">
                  <div className="absolute -left-[30px] top-6 w-4 h-4 rounded-full bg-slate-200 border-4 border-white shadow-sm" />
                  <ul className="space-y-3 text-slate-700 font-bold text-base">
                    <li>09:00 營區早餐，在雲海前喝咖啡。</li>
                    <li>11:00 退營，前往青蛙石天空步道散步（門票 $100/人）。</li>
                    <li>12:30 午餐：宇老景觀餐廳。必點：馬告土雞圓桌大菜。</li>
                    <li>15:00 下山前往新竹市區飯店 Check-in。</li>
                    <li>18:30 晚餐：新竹市區「老港陳」或「家竹亭」。</li>
                  </ul>
                  <div className="mt-4 pt-4 border-t border-slate-50 text-vibrant-secondary font-black text-xs">
                    EST. COST: 住宿 $5,000 + 午餐大菜 $3,000 + 門票 $400 = $8,400
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h5 className="text-sm font-black uppercase tracking-[0.2em] text-vibrant-accent mb-6 flex items-center gap-3">
                <div className="w-6 h-1 bg-vibrant-accent rounded-full" />
                4/5 (日) 第三天：老街懷舊 × 海岸夕陽
              </h5>
              <div className="grid gap-4 pl-9 relative">
                <div className="absolute left-3 top-0 bottom-0 w-px bg-slate-100" />
                <div className="bg-white p-5 rounded-2xl border-2 border-slate-50 shadow-sm relative">
                  <div className="absolute -left-[30px] top-6 w-4 h-4 rounded-full bg-slate-200 border-4 border-white shadow-sm" />
                  <ul className="space-y-3 text-slate-700 font-bold text-base">
                    <li>10:30 北埔老街：體驗客家擂茶 DIY ($600/組)。</li>
                    <li>12:30 午餐：番婆坑客棧。道地客家熱炒圓桌料理。</li>
                    <li>15:30 南寮漁港：魚鱗天梯拍照，看全台最美夕陽。</li>
                    <li>18:30 晚餐：南寮海鮮餐廳圓桌合菜（現撈海鮮）。</li>
                  </ul>
                  <div className="mt-4 pt-4 border-t border-slate-50 text-vibrant-accent font-black text-xs">
                    EST. COST: 住宿 $5,000 + 擂茶/小吃 $1,500 + 晚餐 $3,500 = $10,000
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h5 className="text-sm font-black uppercase tracking-[0.2em] text-slate-800 mb-6 flex items-center gap-3">
                <div className="w-6 h-1 bg-slate-800 rounded-full" />
                4/6 (一) 第四天：文化巡禮 × 必買名產
              </h5>
              <div className="grid gap-4 pl-9 relative">
                <div className="absolute left-3 top-0 bottom-0 w-px bg-slate-100" />
                <div className="bg-white p-5 rounded-2xl border-2 border-slate-50 shadow-sm relative">
                  <div className="absolute -left-[30px] top-6 w-4 h-4 rounded-full bg-slate-200 border-4 border-white shadow-sm" />
                  <ul className="space-y-3 text-slate-700 font-bold text-base">
                    <li>10:00 新竹市立動物園：陪爸媽在公園般的園區散步。</li>
                    <li>12:00 午餐：新竹城隍廟。鴨香飯、郭家潤餅、燕丸湯大亂鬥。</li>
                    <li>14:00 伴手禮時間：買福源花生醬、水蒸蛋糕、新竹米粉。</li>
                    <li>15:00 帶著愉快心情愉快賦歸。</li>
                  </ul>
                  <div className="mt-4 pt-4 border-t border-slate-50 text-slate-400 font-black text-xs">
                    EST. COST: 午餐 $1,500 + 名產 $2,000 = $3,500
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-10 rounded-[35px] text-center border-4 border-dashed border-slate-200">
            <div className="text-slate-800 font-black text-2xl mb-2">全家 4 人總預算：約 $33,900</div>
            <p className="text-slate-400 font-bold text-sm">(平均每人約 $8,475，包含吃好、住好、玩得好！)</p>
          </div>
        </div>
      )
    },
    { 
      id: 3, 
      title: "四天三夜精彩紀錄 (Video)", 
      subtitle: "Hsinchu Trip Highlights", 
      icon: Youtube, 
      content: (
        <div className="space-y-12">
          <div className="text-center space-y-4">
             <h4 className="text-4xl font-black text-slate-800 tracking-tighter">新竹連假：<span className="text-vibrant-secondary">動態視角</span></h4>
             <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">A 4-Day Journey Captured in Motion</p>
          </div>

          <div className="grid gap-12">
            {[
              { day: 1, title: "Day 1: Glamping in the Clouds", color: "vibrant-primary" },
              { day: 2, title: "Day 2: Forest Trail and Feast", color: "vibrant-secondary" },
              { day: 3, title: "Day 3: Hakka Heritage and Coastal Sunset", color: "vibrant-accent" },
              { day: 4, title: "Day 4: Zoo Fun and Temple Eats", color: "slate-800" }
            ].map((item) => (
              <div key={item.day} className="group">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-2xl bg-${item.color}/10 flex items-center justify-center text-${item.color}`}>
                    <span className="font-black">0{item.day}</span>
                  </div>
                  <h5 className="text-xl font-black text-slate-800 tracking-tight">{item.title}</h5>
                </div>
                <div className="aspect-video bg-slate-900 rounded-[30px] overflow-hidden shadow-xl border-4 border-white group-hover:scale-[1.01] transition-transform duration-500 relative">
                  {/* Google Drive Video Preview Iframe */}
                  <div className="absolute inset-0 w-full h-full">
                    <iframe
                      src={`https://drive.google.com/file/d/${
                        item.day === 1 ? '1KjJf0R7xXrLOBLJjy_CoKUJ2cy0vFftA' :
                        item.day === 2 ? '1G1rbRX1roAiM6_I-8RHnBDEdCSFDNx47' :
                        item.day === 3 ? '1PV3Au-6Z_h7tnZBhxa-dJqsA5y7m9x1a' :
                        '1KCmPUQcFQzx5ERWnTpjIgkaxfrEq3tCr'
                      }/preview`}
                      className="w-full h-full border-0"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      title={item.title}
                    ></iframe>
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-10 mt-10 border-t border-slate-100 text-center">
             <div className="inline-flex items-center gap-2 px-6 py-3 bg-vibrant-primary text-white rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform cursor-pointer">
                <Youtube size={16} />
                Watch Full Compilation
             </div>
          </div>
        </div>
      ) 
    },
    { 
      id: 4, 
      title: "3D 角色建模與設計", 
      subtitle: "Character Design / Avatar", 
      icon: Box, 
      content: (
        <div className="space-y-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-vibrant-primary to-vibrant-accent opacity-20 blur-2xl group-hover:opacity-40 transition-opacity" />
              <div className="relative aspect-square bg-white rounded-[40px] overflow-hidden border-8 border-white shadow-2xl flex items-center justify-center">
                 <img 
                   src="/3d_avatar.png.png" 
                   className="w-full h-full object-contain" 
                   alt="3D Chibi Avatar" 
                 />
                 <div className="absolute inset-0 bg-slate-900/5 group-hover:bg-transparent transition-colors" />
                 <div className="absolute top-6 right-6">
                    <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl border border-slate-100">
                       <span className="text-[10px] font-black uppercase tracking-widest text-vibrant-primary">Render: Cycles 4.0</span>
                    </div>
                 </div>
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="inline-block px-4 py-1 bg-vibrant-primary/10 rounded-full text-[10px] font-black uppercase tracking-widest text-vibrant-primary">
                Digital Sculpture
              </div>
              <h4 className="text-4xl font-black text-slate-900 tracking-tighter leading-none">
                3D Digital<br/>Human Avatar
              </h4>
              <p className="text-slate-500 font-bold leading-relaxed">
                研究如何轉化手繪草圖為高精度的 3D 角色模型。本作品專注於角色肢體與服裝紋理的細節表現，並應用於多媒體互動領域。
              </p>
              
              <div className="pt-4">
                <a 
                  href="https://studio.tripo3d.ai/workspace/generate/girl-character-wearing-brown-plaid-dress-with-white-shirt-and-white-sn-c055b1e9-1da1-4c8f-805a-29dff24b9e35"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-4 px-10 py-5 bg-vibrant-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-vibrant-primary/20"
                >
                  <Box size={20} />
                  <span>View 3D Model Link</span>
                  <ExternalLink size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Polygons", val: "450k+" },
                  { label: "Texture", val: "4K PBR" },
                  { label: "Rigging", val: "Body/Face" },
                  { label: "Format", val: ".obj / .fbx" }
                ].map((stat, i) => (
                  <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-white">
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{stat.label}</div>
                    <div className="text-lg font-black text-slate-800">{stat.val}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-slate-900 p-10 rounded-[35px] text-white">
             <div className="flex items-center gap-6 mb-8 pb-8 border-b border-white/10">
                <div className="w-16 h-16 rounded-2xl bg-vibrant-primary/20 flex items-center justify-center text-vibrant-primary">
                   <Box size={32} />
                </div>
                <div>
                   <h5 className="text-xl font-black">Modeling Process</h5>
                   <p className="text-slate-400 text-sm font-bold">From ZBrush Sculpting to Substance Painter</p>
                </div>
             </div>
             
             <div className="grid sm:grid-cols-3 gap-6">
                {[
                  { step: "01", title: "Sculpting", desc: "ZBrush high-poly carving" },
                  { step: "02", title: "Retopology", desc: "Clean edge flow creation" },
                  { step: "03", title: "Texturing", desc: "PBR material layering" }
                ].map((step, i) => (
                  <div key={i} className="space-y-2">
                    <div className="text-vibrant-secondary font-black text-xs uppercase tracking-widest">Step {step.step}</div>
                    <div className="font-black text-lg">{step.title}</div>
                    <p className="text-slate-400 text-xs font-bold">{step.desc}</p>
                  </div>
                ))}
             </div>
          </div>
        </div>
      ) 
    }
  ];

  const navLinks = [
    { name: "Archive / 01", id: "home", label: "Front Page" },
    { name: "Archive / 02", id: "experience", label: "Career & Study" },
    { name: "Archive / 03", id: "projects", label: "Selected Works" },
    { name: "Archive / 04", id: "skills", label: "Technical Proficiencies" },
    { name: "Archive / 05", id: "bio", label: "Narrative Bio" },
  ];

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-vibrant-primary selection:text-white overflow-x-hidden">
      {/* Vibrant Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none -z-10 bg-[radial-gradient(circle_at_50%_-20%,#ec489915,transparent_50%),radial-gradient(circle_at_100%_100%,#06b6d415,transparent_50%),radial-gradient(circle_at_0%_50%,#8b5cf610,transparent_50%)]" />
      
      <div className="fixed top-0 left-0 w-24 h-full border-r border-slate-200/40 z-40 hidden xl:flex flex-col items-center py-12 justify-between pointer-events-none">
        <div className="rotate-270 text-[10px] font-black uppercase tracking-[0.6em] whitespace-nowrap opacity-30 text-vibrant-primary">Portfolio Issue No. 2006</div>
        <div className="w-1 flex-1 bg-gradient-to-b from-vibrant-primary via-vibrant-secondary to-vibrant-accent rounded-full my-12" />
        <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center">
          <Anchor size={20} className="text-vibrant-primary" />
        </div>
      </div>

      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-white/90 backdrop-blur-xl py-4 shadow-lg shadow-slate-200/40" : "bg-transparent py-8"}`}>
        <div className="max-w-6xl mx-auto px-10 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="group flex items-center gap-4 overflow-hidden bg-slate-900 text-white pl-1 pr-6 py-1 rounded-full hover:bg-vibrant-primary transition-all duration-300 shadow-xl shadow-slate-900/10"
            >
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md transition-transform group-hover:scale-110">
                <Menu size={20} />
              </div>
              <span className="font-sans font-black text-xs uppercase tracking-widest">Menu</span>
            </button>
            <div className="h-6 w-px bg-slate-200 hidden sm:block" />
            <div className="font-black text-xl tracking-tighter text-slate-900 hidden md:block">Kuo <span className="text-vibrant-primary">Portfolio</span></div>
          </div>
          <div className="flex items-center gap-8">
             <div className="hidden lg:flex gap-6 text-[11px] font-black uppercase tracking-[0.2em] opacity-50">
                <span className="text-vibrant-secondary">Kaohsiung</span>
                <span className="text-slate-300">/</span>
                <span className="text-vibrant-accent">Student</span>
             </div>
             <div className="w-12 h-12 bg-white rounded-2xl shadow-xl shadow-slate-200/50 flex items-center justify-center text-slate-400 hover:text-vibrant-primary transition-all cursor-pointer border border-slate-50">
              <Search size={20} />
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[60]"
            />
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 left-0 bottom-0 w-full sm:w-[480px] bg-white z-[70] p-16 shadow-2xl overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-16 px-4">
                <div className="text-xs font-black uppercase tracking-[0.4em] text-vibrant-primary">Navigate</div>
                <button onClick={() => setIsMenuOpen(false)} className="w-14 h-14 bg-slate-50 rounded-full flex items-center justify-center hover:bg-vibrant-primary hover:text-white transition-all group">
                   <X size={28} className="group-hover:rotate-180 transition-transform duration-500" />
                </button>
              </div>
              
              <ul className="space-y-8">
                {navLinks.map((link, i) => (
                  <motion.li 
                    key={link.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <button 
                      onClick={() => scrollTo(link.id)}
                      className="group flex items-center gap-8 w-full p-6 rounded-3xl hover:bg-slate-50 transition-all border-2 border-transparent hover:border-slate-100"
                    >
                      <span className="text-sm font-black text-slate-300 group-hover:text-vibrant-primary transition-colors">{link.name}</span>
                      <span className="text-5xl font-sans font-black group-hover:translate-x-4 transition-transform tracking-tighter">{link.label}</span>
                    </button>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-20 pt-12 border-t border-slate-100 px-4">
                <div className="flex gap-6 mb-8 text-slate-400">
                   {[Linkedin, Instagram, Youtube, Facebook, MessageCircle].map((Icon, i) => (
                      <Icon key={i} size={24} className="hover:text-vibrant-primary transition-colors cursor-pointer" />
                   ))}
                </div>
                <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 leading-loose">
                  Copyright © 2006 — 2024<br/>
                  NKUST Maritime Portfolio
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="max-w-6xl mx-auto px-10 pt-44 pb-32">
        {/* Landing Hero */}
        <section id="home" className="mb-48">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-24 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-block px-5 py-2 bg-gradient-to-r from-vibrant-primary/10 to-vibrant-secondary/10 rounded-full text-xs font-black uppercase tracking-[0.3em] text-vibrant-secondary mb-12">
                   Student Portfolio Vol. 01
                </div>
                <h1 className="text-[110px] md:text-[140px] font-sans font-black text-slate-900 leading-[0.85] tracking-tighter mb-12">
                  郭人瑄<br/>
                  <span className="text-vibrant-primary drop-shadow-[0_10px_10px_rgba(236,72,153,0.1)]">2006</span>
                </h1>
                <p className="text-2xl font-sans font-bold text-slate-500 leading-relaxed max-w-lg mb-16 border-l-8 border-vibrant-secondary pl-8">
                  “ 您好，我是郭人瑄，是一位活潑外向、積極又樂觀的女生 ”
                </p>
                
                <div className="grid grid-cols-2 gap-12 border-t border-slate-100 pt-12">
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-vibrant-primary">Location</h4>
                    <p className="text-xl font-sans font-bold text-slate-800">Kaohsiung, Taiwan</p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-vibrant-secondary">Field</h4>
                    <p className="text-xl font-sans font-bold text-slate-800">Navigation</p>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="relative">
              <motion.div
                initial={{ opacity: 0, rotate: -5 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ duration: 1 }}
                className="relative z-10 aspect-[3/4.5] w-full rounded-[40px] overflow-hidden group shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] border-8 border-white"
              >
                 <img 
                  src="https://lh3.googleusercontent.com/d/1LU0g1CB1xm4ApKYZir2wITqGpxISkVVu" 
                  alt="郭人瑄 Profile" 
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800";
                  }}
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                
                <motion.div 
                  initial={{ rotate: -90, x: -100 }}
                  animate={{ rotate: -90, x: 0 }}
                  transition={{ delay: 1 }}
                  className="absolute left-8 bottom-32 -origin-left text-white font-black text-5xl tracking-tighter uppercase opacity-40 mix-blend-overlay"
                >
                  Portfolio Series
                </motion.div>
              </motion.div>
              
              {/* Vibrant Blobs */}
              <div className="absolute -top-20 -right-20 w-80 h-80 bg-vibrant-primary/20 blur-[120px] rounded-full pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-vibrant-secondary/20 blur-[120px] rounded-full pointer-events-none" />

              <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="absolute -bottom-10 -right-10 w-48 h-48 bg-white rounded-full flex items-center justify-center shadow-2xl z-20 border-2 border-slate-50"
              >
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-4 border-2 border-dashed border-vibrant-primary/30 rounded-full"
                />
                <div className="text-center">
                  <div className="text-[10px] font-black uppercase tracking-widest text-vibrant-primary mb-1">NKUST</div>
                  <div className="text-sm font-black text-slate-800">2024 ACTIVE</div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Career & Study */}
        <Section title="Career & Academic" id="experience">
           <div className="space-y-6 mb-24">
              <div className="flex flex-wrap gap-8">
                 <div className="flex items-center gap-4 bg-white px-8 py-5 rounded-3xl shadow-xl shadow-slate-200/40 border-2 border-slate-50">
                    <div className="w-10 h-10 rounded-xl bg-vibrant-primary/10 flex items-center justify-center text-vibrant-primary">
                       <Mail size={20} />
                    </div>
                    <span className="text-sm font-black font-mono text-slate-800">a111182141@nkust.edu.tw</span>
                 </div>
                 <div className="flex gap-2 items-center bg-white px-8 py-5 rounded-3xl shadow-xl shadow-slate-200/40 border-2 border-slate-50">
                    {[Linkedin, Instagram, Youtube, Facebook, MessageCircle].map((Icon, i) => (
                      <div key={i} className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-300 hover:text-vibrant-primary hover:bg-vibrant-primary/5 transition-all cursor-pointer">
                        <Icon size={22} />
                      </div>
                    ))}
                 </div>
              </div>
           </div>

          <div className="grid gap-20">
            <TimelineItem 
              year="2023 — Present"
              title="國立高雄科技大學旗津校區宿舍幹部"
              subtitle="Secretary General / 秘書長"
              description={[
                "負責宿舍各項會議之紀錄編寫與整理，確保內容完整、紀錄詳實，並依規定保存與彙整相關資料。",
                "辦理獎懲會相關行政事務，包括公文撰寫、資料彙整與流程追蹤，確保程序合乎規範並如期完成。",
                "負責獎懲會決議公告之製作與刊印，確認內容正確無誤，並依規定張貼公告。",
                "協助指導機動組組員宿舍相關任力，包括住宿環境升級及清潔維護等工作。",
                "配合宿舍整體行政連動，協助相關行政運作。"
              ]}
            />
            <TimelineItem 
              type="education"
              year="2022 — Present"
              title="國立高雄科技大學"
              subtitle="Dept. of Navigation / 航海系"
            />
          </div>

          <div className="mt-24 grid md:grid-cols-2 gap-16 bg-white p-16 rounded-[40px] shadow-2xl shadow-slate-200/40 border-2 border-slate-50">
             <div>
               <h4 className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.3em] text-vibrant-secondary mb-10">
                  <div className="w-8 h-8 rounded-lg bg-vibrant-secondary/10 flex items-center justify-center text-vibrant-secondary"><CheckCircle2 size={16}/></div>
                  Languages
               </h4>
               <div className="flex flex-wrap gap-4">
                  <SkillBadge skill="English" level="Intermediate" />
                  <SkillBadge skill="Taiwanese" level="Fluent" />
               </div>
             </div>
             <div>
                <h4 className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.3em] text-vibrant-accent mb-10">
                   <div className="w-8 h-8 rounded-lg bg-vibrant-accent/10 flex items-center justify-center text-vibrant-accent"><Anchor size={16}/></div>
                   Profile Meta
                </h4>
                <div className="flex flex-wrap gap-12">
                  <div className="flex flex-col items-center">
                    <div className="text-4xl font-sans font-black text-slate-800">天秤</div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-300 mt-2">Zodiac</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="text-4xl font-sans font-black text-slate-800">O型</div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-300 mt-2">Blood</div>
                  </div>
                </div>
             </div>
          </div>
        </Section>

        {/* Selected Works */}
        <Section title="Academic Archive" id="projects">
          <div className="grid sm:grid-cols-2 gap-8">
            {projectsContent.map((project) => (
              <ProjectCard 
                key={project.id}
                title={project.title} 
                icon={project.icon} 
                onClick={() => setActiveProject(project)} 
              />
            ))}
          </div>
        </Section>

        <ProjectModal 
          project={activeProject} 
          isOpen={!!activeProject} 
          onClose={() => setActiveProject(null)} 
        />

        {/* Specialized Skills */}
        <Section title="Tech Stack" id="skills">
          <div className="grid lg:grid-cols-2 gap-20">
            <div className="space-y-12 bg-white p-12 rounded-[40px] shadow-xl shadow-slate-200/40 border-2 border-slate-50">
              <div>
                <h3 className="text-xs font-black uppercase tracking-[0.4em] text-vibrant-primary mb-10 pb-6 border-b border-slate-100 flex items-center gap-4">
                   <div className="w-10 h-10 rounded-xl bg-vibrant-primary/10 flex items-center justify-center text-vibrant-primary"><Laptop size={20}/></div>
                   Productivity
                </h3>
                <div className="flex flex-wrap gap-4">
                  {["Word", "Excel", "Powerpoint", "Gmail", "Calendar", "Google Meet"].map(skill => (
                    <SkillBadge key={skill} skill={skill} />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-16 rounded-[40px] text-white shadow-3xl shadow-slate-900/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-vibrant-primary opacity-10 blur-[100px] pointer-events-none" />
              <h3 className="text-xs font-black uppercase tracking-[0.4em] text-vibrant-secondary mb-12 flex items-center gap-4">
                 <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-vibrant-secondary"><Anchor size={20}/></div>
                 Maritime Certs
              </h3>
              <div className="grid sm:grid-cols-2 gap-8">
                {["基安", "救難艇操縱", "進階滅火", "保全意識", "保全職責", "RORO及油貨"].map((cert) => (
                  <div key={cert} className="flex items-center gap-5 group">
                    <div className="w-3 h-3 rounded-full bg-vibrant-secondary group-hover:scale-150 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.6)] transition-all duration-300" />
                    <span className="text-xl font-sans font-black tracking-tight">{cert}</span>
                  </div>
                ))}
              </div>
              <div className="mt-16 pt-10 border-t border-white/5 text-[10px] font-black uppercase tracking-widest text-white/30">
                Authorized / NKUST Dept. Nav
              </div>
            </div>
          </div>
        </Section>

        {/* Autobiography */}
        <Section title="Narrative Bio" id="bio">
          <div className="bg-white p-16 rounded-[50px] shadow-2xl shadow-slate-200/40 border-2 border-slate-50 relative overflow-hidden max-w-4xl">
             <div className="absolute top-0 right-0 w-48 h-48 bg-vibrant-accent/5 rounded-bl-[100px] pointer-events-none" />
             <div className="text-6xl font-sans font-black leading-tight text-slate-200 mb-12 tracking-tight">
               Constant Growth.
             </div>
             <div className="text-3xl font-sans font-bold text-slate-800 leading-tight mb-16 border-l-12 border-vibrant-primary pl-10 italic">
                “ 凡事只要確立目標，我就會盡全力把該做的事情做到最好 ”
             </div>
             <div className="columns-1 md:columns-2 gap-16 font-sans text-lg leading-9 text-slate-500 font-medium text-justify">
                我是國立高雄科技大學航海科的學生郭人瑄。我的個性是比較踏實、認真型的，凡事只要確立目標，我就會盡全力把該做的事情做到最好，就算面臨困境或壓力我也會挑戰自己勇往直前。
                <br/><br/>
                我成長在一個溫暖的家庭裡，父母一直都很支持我的選擇，也鼓勵我去嘗試自己想做的事情。當我遇到困難或覺得壓力很大的時候，他們會陪我討論、給我建議，而不是直接否定我。因為有家人的支持，我比較勇敢地面對挑戰，也會學會遇到問題不要輕易放棄。
                <br/><br/>
                在學校期間，我擔任了三年的宿舍秘書長，主要負責撰寫公文、整理資料以及協助處理宿舍相關事務。一開始其實也會擔心自己做不好，但在一次次處理文件與溝通協調的過程中，我慢慢變得更有條理，也學會如何與不同的人合作。這段經驗讓我成長很多。
                <br/><br/>
                就讀航海科的這段期間，我學習到許多與航行安全相關的專業知識，也體會到紀律與責任在團隊中的價值。這些經歷讓我更確定自己做事認真、願意負責的態度，也希望未來無論在哪個環境，都能保持這份踏實與努力。
             </div>
          </div>
        </Section>

        {/* Closing */}
        <footer className="mt-48 pt-32 bg-slate-900 rounded-t-[100px] -mx-10 px-20 pb-20 relative overflow-hidden text-white">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-vibrant-primary/20 blur-[150px] -mt-48 rounded-full pointer-events-none" />
          
          <div className="flex flex-col lg:flex-row justify-between items-end gap-24 relative z-10">
            <div className="w-full lg:w-2/3">
              <h2 className="text-[120px] md:text-[180px] font-sans font-black leading-none tracking-tighter mb-12">
                Connect.
              </h2>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(236,72,153,0.3)" }}
                className="group flex items-center gap-6 px-16 py-8 bg-vibrant-primary text-white font-black uppercase tracking-[0.5em] text-sm rounded-[30px] transition-all"
              >
                Inquire Within
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center transition-transform group-hover:translate-x-3">
                   <ChevronRight />
                </div>
              </motion.button>
            </div>
            <div className="w-full lg:w-1/3 space-y-12 lg:text-right">
              <div className="space-y-4">
                <div className="text-[10px] font-black uppercase tracking-[0.5em] text-vibrant-secondary">Location Hub</div>
                <div className="text-5xl font-sans font-black tracking-tighter text-white">KAOHSIUNG</div>
              </div>
              <div className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-500 leading-loose">
                Created with Antigravity Synthesis / 2006<br/>
                Curated by Kuo Jen Hsuan
              </div>
            </div>
          </div>
          
          <div className="mt-40 pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between gap-8 text-[10px] font-black uppercase tracking-[0.4em] text-slate-600">
             <div>Built with React 18 & Vite</div>
             <div className="flex gap-12">
                <span>Terms of Service</span>
                <span>Privacy / 01</span>
             </div>
          </div>
        </footer>
      </main>

      {/* Floating Action */}
      <div className="fixed bottom-12 right-12 z-40">
        <motion.div 
           whileHover={{ y: -10, rotate: 10, scale: 1.1 }}
           onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
           className="w-20 h-20 bg-vibrant-secondary text-white rounded-3xl flex items-center justify-center cursor-pointer shadow-2xl shadow-cyan-300/40 border-4 border-white"
        >
           <div className="flex flex-col items-center">
              <ChevronRight size={32} className="-rotate-90" />
           </div>
        </motion.div>
      </div>
    </div>
  );
}
