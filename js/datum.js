var Datum = (function(){
  var counters = [
    '*******zero',
    '********uno',
    '********due',
    '********tre',
    '****quattro',
    '*****cinque',
    '********sei',
    '******sette',
    '*******otto',
    '*******nove',
    '******dieci',
    '*****undici',
    '*****dodici',
    '****tredici',
    'quattordici',
    '***quindici'
  ];

  var pagesNumbers = [
    'uno************************************',
    'due************************************',
    'tre************************************',
    'quattro********************************',
    'cinque*********************************',
    'sei************************************',
    'sette**********************************',
    'otto***********************************',
    'nove***********************************',
    'dieci**********************************',
    'undici*********************************',
    'dodici*********************************',
    'tredici********************************',
    'quattordici****************************',
    'quindici*******************************',
    'sedici*********************************',
    'diciassette****************************',
    'diciotto*******************************',
    'diciannove*****************************',
    'venti**********************************',
  ];

  var pages = [
//nu eldzlthbaricsbvtrs,h..nv.qzbodgtm//
`
uqido
*
*****ignite
*
a
*
caso******
`,
`
dhcmrlchtdj
`,
`
spazio***************
punto****************
virgola***il**gattino
abcdefghilmnopqrstuvz
`,
`
questo
non
e
un
ignite
`,
//nu eldzlthbaricsbvtrs,h..nv.qzbodgtm//
`
ma...
mauro
dove
e
`,
`
il club
dei mestieri
stravaganti
`,
`
g*n
o*o
o**
g*o
l*n
e*e
`,
`
ecco la risposta
*
ks jdmnauda mnsa
`,
Babel().sample(["pigna", "pizzicotto", "manicotto", "tigre"]),
`
ecco la strategia perfetta
*
coltivare piselli`,
//nu eldzlthbaricsbvtrs,h..nv.qzbodgtm//
`
grano e zizzania
`,
//fu fornito anche uno strumento di nome google,
// che permetteva di trovare tutti i documenti
//che contenevano una certa parola,
//ad esempio questo e un possibile risultato
//cercando "pigna pizzicotto manicotto tigre"
`
conosci te stesso
`,
`
internet di babele
*
*
*
finalmente il titolo
e siamo alla slide numero tredici...
`,
`
il luogo migliore,
te lo dico io,
lo trovi nella lettera scarlatta,
in bella vista
`,
//nu eldzlthbaricsbvtrs,h..nv.qzbodgtm//
`
fottiglione di informazioni inutili
fottiglione di informazioni inutili
fottiglione di informazioni inutili
fottiglione di informazioni inutili
fottiglione di quindici inutili
fottiglione di informazioni inutili
`,
`
le bufale sono mozzarelle
*
non capisco tutto questo
accanimento
contro delle povere mozzarelle
sarete mica
tutti supervegani
`,
`
da una parte discriminare
dall'altra criminalizzare
forse
discriminare
è meglio
`,
`
signal vs noise
`,
`
come usi la testa
`,
`
grazie
`,
  ];

  return {
    pages: pages,
    pagesNumbers: pagesNumbers,
    pagesAndNumbers: pages.map(function(_,i){
      return [pages, pagesNumbers].map(function(array){return array[i]})
    }),
    counters: counters
  }
})