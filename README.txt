ZAHRADA VAŠKO — NÁVRH WEBU 3.0 / 9. 10. 2026
==================================================

JAK SPUSTIT:
- Otevřete index.html v prohlížeči.
- Na GitHub Pages nahrajte OBSAH celé složky zahrada-liberec-redesign (index.html musí být v kořeni webu).
- Všechny stránky používají HTML, CSS a čistý JavaScript (bez frameworků).

CO JE VE VERZI 3.0:
- Zcela nový výrazný úvod s editorial typografií, velkou fotografií, pohybovými efekty a jasnými CTA.
- Přidané služby: kompletní zakládání trávníků, firemní pozemky, prořezávání ovocných stromů.
- Sekání trávníku vizuálně ukazuje opravdu udržovaný trávník (zatím ilustrační foto).
- Nová galerie: archiv původních 93 fotografií, postupné načítání a lightbox.
- Příprava pro před/po (bez vytváření falešných proměn).
- 'Ceník' je přepracován do individuální cenové nabídky podle m² / hodiny / celé zakázky.
- Mobilní rozvržení, SEO a přístupnost, reduced motion.
- Kontaktní formulář otevře e-mailovou aplikaci návštěvníka s vyplněnou zprávou.

DŮLEŽITÉ PŘED OSTRÝM SPUŠTĚNÍM:
1. Vyměnit ilustrační fotografie z Unsplash za kvalitní autentické fotky od pana Vaška.
   Ilustrační fotografie NESMĚJÍ být vydávány za realizace firmy; na webu jsou označené.
2. Fotografie z archivu původního webu jsou zatím načítány ze zahrada-liberec.cz.
   Po dodání kvalitních fotek od klienta je uložte lokálně do images/ a nahraďte URL v HTML.
3. U každé služby od klienta ověřit rozsah a nabídku. Zakládání nových trávníků,
   firemní pozemky a ovocné stromy vycházejí z klientova e-mailu, detailní postupy jsou návrhem.
4. Formulář na statickém GitHub Pages NENÍ automatický odesílací backend.
   Funguje jako mailto; uživatel musí e-mail dokončit a odeslat v emailové aplikaci.
   Pro plně automatické odesílání napojte backend / formulářovou službu se souhlasem klienta.
5. Klient zatím nepotvrdil, zda ceník zcela zrušit. V3 ho nahrazuje individuální nabídkou.
6. Ověřit aktuální kontaktní údaje, doménu, firemní informace a tvrzení před publikací.

FOTOGRAFIE:
- Ilustrační fotografie: Unsplash License (https://unsplash.com/license)
  Autor Se. Tsuchiya – https://unsplash.com/photos/1wAmm_d2TDM (udržovaný trávník)
  Autor FRAEM GmbH – https://unsplash.com/photos/5xML_2EClnA (založení trávníku)
  Autor Eric Stoynov – https://unsplash.com/photos/rWjEhBxxmFM (živý plot)
  Autor Declan Sun – https://unsplash.com/photos/lDqVLNfCMJc (zeleň)
  Autor Sam Davis – https://unsplash.com/photos/DGQiWCe-xu4 (hero)
- Archiv realizačních fotografií je odkazovaný z původního webu Zahrada Liberec.
- ŽÁDNÉ generované AI fotografie.

SEO PŘED NASAZENÍM NA OFICIÁLNÍ DOMÉNU:
- Pro demo jsou vynechány canonical a og:url, aby omylem neukazovaly na cizí / stávající produkční web.
- Před ostrým nasazením přidejte canonical a odpovídající og:url na finální doménu.

VERZE 3.0 – INTEGRACE LOGA VAŠKO (2026-10)
Nové logo je vloženo do hlavičky a patičky všech stránek a také jako znak přes fotografii na úvodní stránce.
images/logo-vasko-320.webp: optimalizovaná verze pro hlavičku a patičku.
images/logo-vasko-760.webp: velká verze pro úvodní stránku.
images/logo-vasko-original.png: původní velké PNG s průhledností pro další použití.
images/favicon.png: ikona prohlížeče.
Provedené úpravy jsou pouze vizuální – ostatní funkce webu jsou zachovány.


VERZE 3.1 – ORIGINÁLNÍ FOTOGRAFIE KLIENTA (16. 10. 2026)
Úvodní foto, fotografie služeb, firemních pozemků a přehledná fotogalerie jsou nyní místní WebP soubory ve složce images/realizace/.
Galerie obsahuje 112 položek rozdělených do devíti kategorií, obsahuje klikací zvětšení a postupné načítání.
Některé kategorie obsahují méně než 10 snímků, protože takový byl obsah klientského archivu.
Zaslaná videa nejsou vložena (nebylo vyžádáno video) a lze je přidat v další verzi.
Srovnání před/po není vytvořeno bez ověření přesných dvojic.
Po nasazení na finální doménu je vhodné nastavit plnou URL obrázku do meta og:image (původní zastaralé externí odkazy odstraněny).
