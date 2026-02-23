/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  ChevronRight, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Lightbulb, 
  Menu, 
  X,
  Search,
  CheckCircle,
  Target,
  Zap,
  BarChart3,
  Layers,
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { LESSONS, Lesson } from './data/content';

// --- Components ---

const Candle = ({ type, color, bodyHeight = 64, wickTop = 16, wickBottom = 16, opacity = 1 }: { 
  type?: string, 
  color: 'green' | 'red',
  bodyHeight?: number,
  wickTop?: number,
  wickBottom?: number,
  opacity?: number,
  key?: any
}) => {
  const isGreen = color === 'green';
  const bgColor = isGreen ? 'bg-emerald-500' : 'bg-rose-500';
  const borderColor = isGreen ? 'border-emerald-600' : 'border-rose-600';

  return (
    <div className="flex flex-col items-center justify-center" style={{ opacity }}>
      <div className={`w-0.5 ${bgColor}`} style={{ height: wickTop }} />
      <div className={`w-4 ${bgColor} border ${borderColor} rounded-xs shadow-sm`} style={{ height: bodyHeight }} />
      <div className={`w-0.5 ${bgColor}`} style={{ height: wickBottom }} />
      {type && <span className="mt-2 text-[8px] font-mono text-zinc-500 uppercase">{type}</span>}
    </div>
  );
};

const MiniChart = ({ candles, trendLines }: { 
  candles: Array<{ color: 'green' | 'red', h: number, wt: number, wb: number }>,
  trendLines?: Array<{ type: 'lta' | 'ltb' | 'support' | 'resistance', points: string }>
}) => {
  return (
    <div className="relative flex items-end gap-1.5 p-8 bg-zinc-950/50 rounded-2xl border border-white/5 overflow-hidden min-h-[200px] w-full">
      {/* Grid Lines */}
      <div className="absolute inset-0 flex flex-col justify-between py-4 opacity-5 pointer-events-none">
        {[...Array(5)].map((_, i) => <div key={i} className="w-full h-px bg-white" />)}
      </div>
      
      <div className="flex items-end gap-1.5 relative z-10">
        {candles.map((c, i) => (
          <Candle key={i} color={c.color} bodyHeight={c.h} wickTop={c.wt} wickBottom={c.wb} />
        ))}
      </div>

      {trendLines && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-20">
          {trendLines.map((line, idx) => {
            const isSupport = line.type === 'support' || line.type === 'lta';
            const color = isSupport ? '#10B981' : '#F43F5E';
            const isDashed = line.type === 'support' || line.type === 'resistance';
            
            return (
              <path 
                key={idx}
                d={line.points} 
                fill="none" 
                stroke={color} 
                strokeWidth="2" 
                strokeDasharray={isDashed ? "4" : "0"}
                className={`drop-shadow-[0_0_8px_${isSupport ? 'rgba(16,185,129,0.4)' : 'rgba(244,63,94,0.4)'}]`}
              />
            );
          })}
        </svg>
      )}
    </div>
  );
};

const PatternVisualizer = ({ id }: { id: string }) => {
  const containerClass = "bg-zinc-900/50 p-6 rounded-3xl border border-white/5 flex flex-col items-center justify-center min-h-[300px] w-full relative overflow-hidden";
  
  if (id === 'sr-visual') {
    const candles: any[] = [
      { color: 'green', h: 40, wt: 10, wb: 5 },
      { color: 'green', h: 60, wt: 5, wb: 10 },
      { color: 'red', h: 30, wt: 20, wb: 5 },
      { color: 'red', h: 50, wt: 5, wb: 15 },
      { color: 'green', h: 20, wt: 15, wb: 5 },
      { color: 'green', h: 45, wt: 5, wb: 10 },
    ];
    return (
      <div className={containerClass}>
        <MiniChart 
          candles={candles} 
          trendLines={[
            { type: 'resistance', points: 'M 0 40 L 600 40' },
            { type: 'support', points: 'M 0 160 L 600 160' }
          ]} 
        />
        <div className="mt-4 flex gap-8 text-[10px] font-bold uppercase tracking-widest">
          <span className="text-rose-400">Resistência (Teto / Venda)</span>
          <span className="text-emerald-400">Suporte (Chão / Compra)</span>
        </div>
      </div>
    );
  }

  if (id === 'lta-ltb-visual') {
    const ltaCandles: any[] = [
      { color: 'green', h: 20, wt: 5, wb: 10 },
      { color: 'red', h: 15, wt: 10, wb: 5 },
      { color: 'green', h: 35, wt: 5, wb: 15 },
      { color: 'green', h: 45, wt: 10, wb: 5 },
      { color: 'red', h: 20, wt: 15, wb: 10 },
      { color: 'green', h: 60, wt: 5, wb: 20 },
    ];
    return (
      <div className={containerClass}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <div className="flex flex-col items-center gap-3">
            <MiniChart candles={ltaCandles} trendLines={[{ type: 'lta', points: 'M 20 180 L 280 60' }]} />
            <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">LTA (Tendência de Alta)</span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <MiniChart 
              candles={ltaCandles.map(c => ({ ...c, color: c.color === 'green' ? 'red' : 'green' })).reverse()} 
              trendLines={[{ type: 'ltb', points: 'M 20 60 L 280 180' }]} 
            />
            <span className="text-[10px] text-rose-400 font-bold uppercase tracking-widest">LTB (Tendência de Baixa)</span>
          </div>
        </div>
      </div>
    );
  }

  if (id === 'ponto-x-visual') {
    return (
      <div className={containerClass}>
        <div className="w-full h-px bg-rose-500/50 absolute top-1/2 left-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-px bg-emerald-500 rotate-[30deg]" />
        <div className="w-4 h-4 bg-white rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_20px_white] animate-pulse" />
        <span className="absolute top-[55%] left-[55%] text-[10px] text-white font-bold uppercase tracking-widest">PONTO X</span>
      </div>
    );
  }

  if (id === 'pullback-visual') {
    const candles: any[] = [
      { color: 'green', h: 40, wt: 5, wb: 5 },
      { color: 'green', h: 80, wt: 2, wb: 10 }, // Rompimento
      { color: 'red', h: 35, wt: 15, wb: 2 },  // Pullback (toca a linha)
      { color: 'green', h: 60, wt: 5, wb: 5 }, // Continuação
    ];
    return (
      <div className={containerClass}>
        <MiniChart candles={candles} trendLines={[{ type: 'support', points: 'M 0 120 L 600 120' }]} />
        <span className="mt-4 text-[10px] text-emerald-400 font-bold uppercase tracking-widest animate-pulse">Momento de Entrada (Pullback no Suporte)</span>
      </div>
    );
  }

  if (id === 'macro-micro-visual') {
    return (
      <div className={containerClass}>
        <div className="relative w-full h-48 flex items-center justify-center">
          {/* Macro Trend */}
          <svg viewBox="0 0 400 200" className="absolute inset-0 w-full h-full opacity-20">
            <path d="M0,180 L100,140 L200,100 L300,60 L400,20" fill="none" stroke="#10B981" strokeWidth="10" strokeLinecap="round" />
          </svg>
          {/* Micro Trends */}
          <svg viewBox="0 0 400 200" className="absolute inset-0 w-full h-full">
            <path d="M0,180 L40,160 L20,170 L80,130 L60,145 L120,110 L100,125 L160,90 L140,105 L200,70" fill="none" stroke="#10B981" strokeWidth="3" />
            <path d="M200,70 L240,90 L220,80 L280,110 L260,100 L320,130 L300,120 L360,150 L340,140 L400,170" fill="none" stroke="#F43F5E" strokeWidth="3" />
          </svg>
          <div className="absolute top-4 left-4 text-[10px] text-emerald-400 font-bold uppercase">Macro de Alta</div>
          <div className="absolute bottom-4 right-4 text-[10px] text-rose-400 font-bold uppercase">Micro de Baixa (Correção)</div>
        </div>
      </div>
    );
  }

  if (id === 'candle-types-visual') {
    return (
      <div className={containerClass}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
          <div className="flex flex-col items-center gap-2">
            <Candle color="green" bodyHeight={80} wickTop={10} wickBottom={5} />
            <span className="text-[8px] text-zinc-500 font-bold uppercase">Impulsão</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Candle color="green" bodyHeight={100} wickTop={2} wickBottom={2} />
            <span className="text-[8px] text-zinc-500 font-bold uppercase">Força</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Candle color="green" bodyHeight={10} wickTop={5} wickBottom={5} />
            <span className="text-[8px] text-zinc-500 font-bold uppercase">Descanso</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Candle color="red" bodyHeight={140} wickTop={5} wickBottom={5} />
            <span className="text-[8px] text-zinc-500 font-bold uppercase">Exaustão</span>
          </div>
        </div>
      </div>
    );
  }

  if (id === 'entrega-futura-visual') {
    return (
      <div className={containerClass}>
        <div className="flex gap-12 items-center">
          <div className="relative flex flex-col items-center">
            <div className="absolute -top-12 w-32 h-px bg-white/20 border-t border-dashed border-white/40" />
            <div className="w-0.5 h-24 bg-emerald-500" />
            <div className="w-8 h-12 bg-emerald-500 rounded-sm" />
            <span className="mt-2 text-[8px] text-emerald-400 font-bold uppercase">Entrega de Alta</span>
            <ArrowRight className="absolute -top-8 rotate-[-90deg] text-emerald-400 w-4 h-4 animate-pulse" />
          </div>
          <div className="relative flex flex-col items-center">
            <div className="w-8 h-12 bg-rose-500 rounded-sm" />
            <div className="w-0.5 h-24 bg-rose-500" />
            <div className="absolute -bottom-12 w-32 h-px bg-white/20 border-t border-dashed border-white/40" />
            <span className="mt-2 text-[8px] text-rose-400 font-bold uppercase">Entrega de Baixa</span>
            <ArrowRight className="absolute -bottom-8 rotate-[90deg] text-rose-400 w-4 h-4 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (id === 'engolfo-visual') {
    return (
      <div className={containerClass}>
        <div className="flex items-center gap-8">
          <div className="flex flex-col items-center opacity-40 scale-75">
            <div className="w-0.5 h-3 bg-rose-500" />
            <div className="w-6 h-10 bg-rose-500 rounded-sm" />
            <div className="w-0.5 h-3 bg-rose-500" />
          </div>
          <ArrowRight className="text-zinc-700 w-8 h-8" />
          <div className="flex flex-col items-center relative">
            <div className="absolute inset-0 border-2 border-emerald-500/30 rounded-lg -m-2 animate-pulse" />
            <div className="w-0.5 h-4 bg-emerald-500" />
            <div className="w-12 h-24 bg-emerald-500 rounded-sm shadow-[0_0_30px_rgba(16,185,129,0.3)]" />
            <div className="w-0.5 h-4 bg-emerald-500" />
          </div>
        </div>
        <span className="absolute bottom-4 text-[8px] text-emerald-400 font-bold uppercase tracking-widest">O corpo atual cobre o anterior</span>
      </div>
    );
  }

  if (id === 'harami-visual') {
    return (
      <div className={containerClass}>
        <div className="flex items-center gap-8">
          <div className="flex flex-col items-center">
            <div className="w-0.5 h-4 bg-rose-500" />
            <div className="w-12 h-24 bg-rose-500 rounded-sm" />
            <div className="w-0.5 h-4 bg-rose-500" />
          </div>
          <ArrowRight className="text-zinc-700 w-8 h-8" />
          <div className="flex flex-col items-center scale-75">
            <div className="w-0.5 h-2 bg-emerald-500" />
            <div className="w-6 h-10 bg-emerald-500 rounded-sm shadow-[0_0_20px_rgba(16,185,129,0.2)]" />
            <div className="w-0.5 h-2 bg-emerald-500" />
          </div>
        </div>
        <span className="absolute bottom-4 text-[8px] text-rose-400 font-bold uppercase tracking-widest">O corpo atual fica dentro do anterior</span>
      </div>
    );
  }

  if (id === 'martelo-visual') {
    return (
      <div className={containerClass}>
        <div className="flex gap-16">
          <div className="flex flex-col items-center group">
            <div className="w-10 h-6 bg-emerald-500 rounded-sm shadow-[0_0_15px_rgba(16,185,129,0.3)]" />
            <div className="w-0.5 h-20 bg-emerald-500" />
            <span className="mt-2 text-[10px] text-emerald-500 font-bold uppercase">Martelo</span>
            <span className="text-[8px] text-zinc-600 font-mono">Pavio ≥ 2x Corpo</span>
          </div>
          <div className="flex flex-col items-center group">
            <div className="w-0.5 h-20 bg-rose-500" />
            <div className="w-10 h-6 bg-rose-500 rounded-sm shadow-[0_0_15px_rgba(244,63,94,0.3)]" />
            <span className="mt-2 text-[10px] text-rose-500 font-bold uppercase">Invertido</span>
            <span className="text-[8px] text-zinc-600 font-mono">Pavio ≥ 2x Corpo</span>
          </div>
        </div>
      </div>
    );
  }

  if (id === 'tres-torres-visual') {
    const candles: any[] = [
      { color: 'green', h: 30, wt: 5, wb: 5 },
      { color: 'green', h: 50, wt: 10, wb: 2 },
      { color: 'green', h: 40, wt: 20, wb: 5 }, // Rejeição no topo
      { color: 'red', h: 45, wt: 5, wb: 10 },
      { color: 'red', h: 60, wt: 2, wb: 5 },
    ];
    return (
      <div className={containerClass}>
        <MiniChart candles={candles} trendLines={[{ type: 'ltb', points: 'M 100 40 L 300 150' }]} />
        <span className="mt-4 text-[10px] text-rose-400 font-bold uppercase tracking-widest">Padrão 3 Torres (Reversão)</span>
      </div>
    );
  }

  if (id === 'oco-visual') {
    const candles: any[] = [
      { color: 'green', h: 30, wt: 5, wb: 5 },
      { color: 'green', h: 50, wt: 5, wb: 5 }, // Ombro 1
      { color: 'red', h: 20, wt: 5, wb: 5 },
      { color: 'green', h: 80, wt: 5, wb: 5 }, // Cabeça
      { color: 'red', h: 40, wt: 5, wb: 5 },
      { color: 'green', h: 50, wt: 5, wb: 5 }, // Ombro 2
      { color: 'red', h: 60, wt: 5, wb: 5 }, // Rompimento
    ];
    return (
      <div className={containerClass}>
        <MiniChart candles={candles} trendLines={[{ type: 'resistance', points: 'M 0 140 L 600 140' }]} />
        <span className="mt-4 text-[10px] text-rose-400 font-bold uppercase tracking-widest">OCO (Ombro Cabeça Ombro)</span>
      </div>
    );
  }

  if (id === 'topo-fundo-duplo-visual') {
    const mCandles: any[] = [
      { color: 'green', h: 40, wt: 5, wb: 5 },
      { color: 'green', h: 60, wt: 5, wb: 5 }, // Topo 1
      { color: 'red', h: 30, wt: 5, wb: 5 },
      { color: 'green', h: 60, wt: 5, wb: 5 }, // Topo 2
      { color: 'red', h: 70, wt: 5, wb: 5 }, // Rompimento
    ];
    return (
      <div className={containerClass}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <div className="flex flex-col items-center gap-3">
            <MiniChart candles={mCandles} trendLines={[{ type: 'resistance', points: 'M 0 60 L 300 60' }]} />
            <span className="text-[10px] text-rose-400 font-bold uppercase tracking-widest">Topo Duplo (M)</span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <MiniChart 
              candles={mCandles.map(c => ({ ...c, color: c.color === 'green' ? 'red' : 'green' }))} 
              trendLines={[{ type: 'support', points: 'M 0 140 L 300 140' }]} 
            />
            <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Fundo Duplo (W)</span>
          </div>
        </div>
      </div>
    );
  }

  if (id === 'lateralizacao-visual') {
    const candles: any[] = [
      { color: 'green', h: 30, wt: 10, wb: 10 },
      { color: 'red', h: 35, wt: 5, wb: 5 },
      { color: 'green', h: 25, wt: 15, wb: 15 },
      { color: 'red', h: 40, wt: 10, wb: 10 },
      { color: 'green', h: 30, wt: 5, wb: 5 },
      { color: 'red', h: 35, wt: 10, wb: 10 },
    ];
    return (
      <div className={containerClass}>
        <MiniChart candles={candles} trendLines={[
          { type: 'resistance', points: 'M 0 60 L 600 60' },
          { type: 'support', points: 'M 0 140 L 600 140' }
        ]} />
        <span className="mt-4 text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em]">Consolidação (Bate e Volta)</span>
      </div>
    );
  }

  if (id === 'doji-visual') {
    return (
      <div className={containerClass}>
        <div className="flex gap-12">
          <div className="flex flex-col items-center">
            <div className="w-0.5 h-8 bg-zinc-400" />
            <div className="w-8 h-0.5 bg-zinc-400" />
            <div className="w-0.5 h-8 bg-zinc-400" />
            <span className="mt-2 text-[8px] text-zinc-400 font-bold">DOJI</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-0.5 h-12 bg-zinc-400" />
            <div className="w-8 h-0.5 bg-zinc-400" />
            <div className="w-0.5 h-2 bg-zinc-400" />
            <span className="mt-2 text-[8px] text-zinc-400 font-bold">LÁPIDE</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-0.5 h-2 bg-zinc-400" />
            <div className="w-8 h-0.5 bg-zinc-400" />
            <div className="w-0.5 h-12 bg-zinc-400" />
            <span className="mt-2 text-[8px] text-zinc-400 font-bold">LIBÉLULA</span>
          </div>
        </div>
      </div>
    );
  }

  if (id === 'spinning-top-visual') {
    return (
      <div className={containerClass}>
        <div className="flex gap-12">
          <div className="flex flex-col items-center">
            <div className="w-0.5 h-8 bg-emerald-500" />
            <div className="w-8 h-6 bg-emerald-500 rounded-sm" />
            <div className="w-0.5 h-8 bg-emerald-500" />
          </div>
          <div className="flex flex-col items-center">
            <div className="w-0.5 h-8 bg-rose-500" />
            <div className="w-8 h-6 bg-rose-500 rounded-sm" />
            <div className="w-0.5 h-8 bg-rose-500" />
          </div>
        </div>
        <span className="absolute bottom-4 text-[8px] text-zinc-500 font-bold uppercase tracking-widest">Spinning Top</span>
      </div>
    );
  }

  if (id === 'pressure-rejection-visual') {
    return (
      <div className={containerClass}>
        <div className="flex gap-16">
          <div className="flex flex-col items-center relative">
            <ArrowRight className="absolute -top-8 rotate-[-90deg] text-emerald-400 w-4 h-4 animate-bounce" />
            <div className="w-0.5 h-12 bg-emerald-500" />
            <div className="w-8 h-12 bg-emerald-500 rounded-sm" />
            <span className="mt-2 text-[8px] text-emerald-400 font-bold">PRESSÃO</span>
          </div>
          <div className="flex flex-col items-center relative">
            <div className="w-8 h-12 bg-rose-500 rounded-sm" />
            <div className="w-0.5 h-12 bg-rose-500" />
            <ArrowRight className="absolute -bottom-8 rotate-[90deg] text-rose-400 w-4 h-4 animate-bounce" />
            <span className="mt-10 text-[8px] text-rose-400 font-bold">REJEIÇÃO</span>
          </div>
        </div>
      </div>
    );
  }

  if (id === 'simetria-visual') {
    return (
      <div className={containerClass}>
        <div className="relative flex flex-col items-center gap-4">
          <div className="absolute top-1/2 w-64 h-px bg-rose-500/50 border-t border-dashed border-rose-400" />
          <div className="flex gap-8 items-end relative z-10">
            <div className="flex flex-col items-center">
              <div className="w-0.5 h-16 bg-emerald-500" />
              <div className="w-8 h-12 bg-emerald-500 rounded-sm" />
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-12 bg-rose-500 rounded-sm" />
              <div className="w-0.5 h-16 bg-rose-500" />
            </div>
          </div>
          <span className="text-[10px] text-rose-400 font-bold uppercase tracking-widest mt-8">Simetria de Pavio (Ponto de Retorno)</span>
        </div>
      </div>
    );
  }

  if (id === 'momentum-visual') {
    const candles: any[] = [
      { color: 'green', h: 20, wt: 2, wb: 2 },
      { color: 'green', h: 40, wt: 2, wb: 2 },
      { color: 'green', h: 70, wt: 2, wb: 2 },
      { color: 'green', h: 100, wt: 2, wb: 2 },
    ];
    return (
      <div className={containerClass}>
        <div className="flex flex-col items-center gap-4">
          <MiniChart candles={candles} />
          <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Momentum de Alta (Força Crescente)</span>
        </div>
      </div>
    );
  }

  if (id === 'strategies-visual') {
    const candles: any[] = [
      { color: 'green', h: 30, wt: 5, wb: 5 },
      { color: 'green', h: 50, wt: 5, wb: 5 },
      { color: 'green', h: 80, wt: 2, wb: 2 }, // Breakout
      { color: 'red', h: 20, wt: 10, wb: 10 }, // Retração
      { color: 'green', h: 40, wt: 5, wb: 5 },
    ];
    return (
      <div className={containerClass}>
        <MiniChart candles={candles} />
        <span className="mt-4 text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Exemplo de Fluxo e Retração</span>
      </div>
    );
  }

  if (id === 'best-practices-visual') {
    return (
      <div className={containerClass}>
        <div className="relative flex flex-col items-center gap-6">
          <div className="absolute top-1/2 w-64 h-px bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]" />
          <div className="flex gap-12 items-end relative z-10">
            <div className="flex flex-col items-center">
              <div className="w-8 h-24 bg-emerald-500 rounded-sm" />
              <span className="mt-2 text-[8px] text-emerald-400 font-bold">VELA TRAVADA</span>
            </div>
            <div className="flex flex-col items-center opacity-30">
              <div className="w-8 h-12 bg-rose-500 rounded-sm" />
              <span className="mt-2 text-[8px] text-zinc-500 font-bold">NÃO OPERAR</span>
            </div>
          </div>
          <div className="bg-rose-500/10 border border-rose-500/20 px-4 py-2 rounded-lg">
            <span className="text-[10px] text-rose-400 font-bold uppercase tracking-widest flex items-center gap-2">
              <AlertCircle className="w-3 h-3" /> Risco de Reversão Imediata
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={containerClass}>
      <div className="text-zinc-700 flex flex-col items-center gap-4">
        <BarChart3 className="w-12 h-12 opacity-20" />
        <span className="text-xs font-medium opacity-40">Visualização em desenvolvimento</span>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [activeLessonId, setActiveLessonId] = useState(LESSONS[0].id);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  const activeLesson = useMemo(() => 
    LESSONS.find(l => l.id === activeLessonId) || LESSONS[0]
  , [activeLessonId]);

  const filteredLessons = useMemo(() => 
    LESSONS.filter(l => 
      l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
  , [searchQuery]);

  const categories = useMemo(() => {
    const cats = new Set(LESSONS.map(l => l.category));
    return Array.from(cats);
  }, []);

  const toggleLessonCompletion = (id: string) => {
    setCompletedLessons(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex h-screen bg-[#0A0A0A] text-zinc-100 font-sans selection:bg-emerald-500/30">
      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.aside 
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className="fixed inset-y-0 left-0 z-50 w-72 bg-zinc-900 border-r border-white/5 flex flex-col lg:relative"
          >
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                  <Target className="w-5 h-5 text-black" />
                </div>
                <h1 className="font-bold tracking-tight text-lg">Black Diamond</h1>
              </div>
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden p-2 hover:bg-white/5 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input 
                  type="text" 
                  placeholder="Buscar lição..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-zinc-800/50 border border-white/5 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                />
              </div>
            </div>

            <nav className="flex-1 overflow-y-auto p-4 space-y-6">
              {categories.map(cat => {
                const catLessons = filteredLessons.filter(l => l.category === cat);
                if (catLessons.length === 0) return null;
                
                return (
                  <div key={cat} className="space-y-2">
                    <h2 className="px-3 text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-500">{cat}</h2>
                    <div className="space-y-1">
                      {catLessons.map(lesson => (
                        <button
                          key={lesson.id}
                          onClick={() => {
                            setActiveLessonId(lesson.id);
                            if (window.innerWidth < 1024) setIsSidebarOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all group ${
                            activeLessonId === lesson.id 
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.05)]' 
                              : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-100 border border-transparent'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            {completedLessons.includes(lesson.id) ? (
                              <CheckCircle className="w-4 h-4 text-emerald-500" />
                            ) : (
                              <div className={`w-1.5 h-1.5 rounded-full ${activeLessonId === lesson.id ? 'bg-emerald-400' : 'bg-zinc-700 group-hover:bg-zinc-500'}`} />
                            )}
                            <span className="truncate max-w-[160px]">{lesson.title}</span>
                          </div>
                          <ChevronRight className={`w-4 h-4 transition-transform ${activeLessonId === lesson.id ? 'translate-x-0' : '-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </nav>

            <div className="p-4 border-t border-white/5 bg-zinc-900/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">Progresso</span>
                <span className="text-[10px] font-mono text-emerald-400">
                  {Math.round((completedLessons.length / LESSONS.length) * 100)}%
                </span>
              </div>
              <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(completedLessons.length / LESSONS.length) * 100}%` }}
                  className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                />
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Header */}
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-zinc-900/50 backdrop-blur-xl sticky top-0 z-40">
          <div className="flex items-center gap-4">
            {!isSidebarOpen && (
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}
            <div className="flex items-center gap-2 text-sm text-zinc-400">
              <BookOpen className="w-4 h-4" />
              <span>{activeLesson.category}</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-zinc-100 font-medium">{activeLesson.title}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => toggleLessonCompletion(activeLesson.id)}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                completedLessons.includes(activeLesson.id)
                  ? 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                  : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
              }`}
            >
              {completedLessons.includes(activeLesson.id) ? (
                <>
                  <CheckCircle className="w-3.5 h-3.5" />
                  Concluído
                </>
              ) : (
                'Marcar como Lido'
              )}
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-6 py-12 space-y-12">
            <motion.div
              key={activeLesson.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="space-y-8"
            >
              {/* Hero Section */}
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                  <Zap className="w-3 h-3" />
                  Lição {LESSONS.findIndex(l => l.id === activeLesson.id) + 1}
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-white">
                  {activeLesson.title}
                </h2>
              </div>

              {/* Text Content */}
              <div className="space-y-6 text-lg leading-relaxed text-zinc-300">
                {activeLesson.content.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* Visual Aids */}
              {activeLesson.visualType && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {activeLesson.visualType === 'candle' && !activeLesson.patternId && (
                    <>
                      <div className="bg-zinc-900 border border-white/5 rounded-2xl p-8 flex flex-col items-center justify-center group hover:border-emerald-500/30 transition-colors">
                        <Candle type="Alta" color="green" />
                        <p className="mt-4 text-xs text-zinc-500 text-center font-medium">Pressão de Compra</p>
                      </div>
                      <div className="bg-zinc-900 border border-white/5 rounded-2xl p-8 flex flex-col items-center justify-center group hover:border-rose-500/30 transition-colors">
                        <Candle type="Baixa" color="red" />
                        <p className="mt-4 text-xs text-zinc-500 text-center font-medium">Pressão de Venda</p>
                      </div>
                    </>
                  )}
                  {activeLesson.patternId && (
                    <div className="col-span-full">
                      <PatternVisualizer id={activeLesson.patternId} />
                    </div>
                  )}
                </div>
              )}

              {/* Tips & Warnings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activeLesson.tips && activeLesson.tips.length > 0 && (
                  <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-6 space-y-3">
                    <div className="flex items-center gap-2 text-emerald-400">
                      <Lightbulb className="w-5 h-5" />
                      <h4 className="font-bold text-sm uppercase tracking-wider">Dica Pro</h4>
                    </div>
                    <ul className="space-y-2">
                      {activeLesson.tips.map((tip, idx) => (
                        <li key={idx} className="text-sm text-zinc-400 flex gap-2">
                          <div className="w-1 h-1 rounded-full bg-emerald-500 mt-2 shrink-0" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {activeLesson.warnings && activeLesson.warnings.length > 0 && (
                  <div className="bg-rose-500/5 border border-rose-500/10 rounded-2xl p-6 space-y-3">
                    <div className="flex items-center gap-2 text-rose-400">
                      <AlertTriangle className="w-5 h-5" />
                      <h4 className="font-bold text-sm uppercase tracking-wider">Atenção</h4>
                    </div>
                    <ul className="space-y-2">
                      {activeLesson.warnings.map((warning, idx) => (
                        <li key={idx} className="text-sm text-zinc-400 flex gap-2">
                          <div className="w-1 h-1 rounded-full bg-rose-500 mt-2 shrink-0" />
                          {warning}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Navigation Buttons */}
              <div className="pt-12 border-t border-white/5 flex items-center justify-between">
                {LESSONS.findIndex(l => l.id === activeLesson.id) > 0 ? (
                  <button 
                    onClick={() => setActiveLessonId(LESSONS[LESSONS.findIndex(l => l.id === activeLesson.id) - 1].id)}
                    className="flex items-center gap-2 text-zinc-500 hover:text-zinc-100 transition-colors text-sm font-medium"
                  >
                    <ChevronRight className="w-4 h-4 rotate-180" />
                    Anterior
                  </button>
                ) : <div />}
                
                {LESSONS.findIndex(l => l.id === activeLesson.id) < LESSONS.length - 1 ? (
                  <button 
                    onClick={() => setActiveLessonId(LESSONS[LESSONS.findIndex(l => l.id === activeLesson.id) + 1].id)}
                    className="flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-emerald-500 transition-all shadow-lg hover:shadow-emerald-500/20"
                  >
                    Próxima Lição
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <div className="text-emerald-500 font-bold text-sm flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Curso Completo!
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Floating Action for Mobile */}
        {!isSidebarOpen && (
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden fixed bottom-6 right-6 w-14 h-14 bg-emerald-500 text-black rounded-full shadow-2xl flex items-center justify-center z-50 hover:scale-110 active:scale-95 transition-all"
          >
            <Menu className="w-6 h-6" />
          </button>
        )}
      </main>
    </div>
  );
}
