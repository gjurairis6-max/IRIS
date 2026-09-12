import React from 'react';
import { EmblemKastrioti } from './EmblemKastrioti';
import { Scroll, Heart, Shield, BookOpen } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid md:grid-cols-12 gap-8 pb-10 border-b border-stone-800/80">
          
          {/* Brand & Tribute */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <EmblemKastrioti size="md" variant="shield" />
              <div>
                <h3 className="font-serif font-bold text-lg text-amber-400 tracking-wide uppercase">
                  Gjergj Kastrioti Skënderbeu
                </h3>
                <p className="text-xs text-stone-400">
                  1405–1468 • Heroi Kombëtar i Shqiptarëve
                </p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-stone-400 max-w-md leading-relaxed">
              Një homazh interaktiv dhe shkencor kushtuar figurës së pavdekshme të Skënderbeut, 
              qëndresës së lavdishme 25-vjeçare, bashkimit të Lidhjes së Lezhës dhe diplomacisë evropiane.
            </p>
            <div className="text-xs text-amber-400/90 font-serif italic">
              "Lirinë nuk ua solla unë, por e gjeta këtu në mesin tuaj!" — Krujë, 1443
            </div>
          </div>

          {/* Historical Sources */}
          <div className="md:col-span-3 space-y-2 text-xs">
            <h4 className="font-serif font-bold text-stone-200 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              Burimet Historike
            </h4>
            <ul className="space-y-1.5 text-stone-400">
              <li>• Marin Barleti: <em>Historia de vita et gestis Scanderbegi</em> (Romë, 1508)</li>
              <li>• Fan S. Noli: <em>Gjergj Kastrioti Skënderbeu (1405–1468)</em></li>
              <li>• Kristo Frashëri: <em>Skënderbeu, jeta dhe vepra</em></li>
              <li>• Arkivi Shtetëror i Napolit & Venedikut (Archivio di Stato)</li>
            </ul>
          </div>

          {/* Quick Nav */}
          <div className="md:col-span-3 space-y-2 text-xs">
            <h4 className="font-serif font-bold text-stone-200 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              Seksionet Kryesore
            </h4>
            <div className="grid grid-cols-1 gap-1 text-stone-400">
              <a href="#kronika" className="hover:text-amber-300 transition-colors">• Kronika & Fëmijëria në Oborr</a>
              <a href="#harta" className="hover:text-amber-300 transition-colors">• Harta: Petrela deri në Modriç</a>
              <a href="#traktatet" className="hover:text-amber-300 transition-colors">• Traktati i Gaetës (1451)</a>
              <a href="#taktikat" className="hover:text-amber-300 transition-colors">• Doktrina Ushtarake & Armët</a>
              <a href="#kuizi" className="hover:text-amber-300 transition-colors">• Kuizi Ndërveprues</a>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-3">
          <div>
            © {new Date().getFullYear()} Gjergj Kastrioti Skënderbeu • Trashëgimia Historike Kombëtare
          </div>
          <div className="flex items-center gap-1 text-stone-400">
            <span>Ndërtuar me nderim për historinë e Arbërisë</span>
            <Shield className="w-3.5 h-3.5 text-red-500 inline ml-1" />
          </div>
        </div>

      </div>
    </footer>
  );
};
