import axios from "axios";
import { BookList, BookListsApi } from "./bookLists.types";
import { parseBookList, parseBookLists } from "./bookLists.parsers";

const url = "/book-list";

export const bookListsApi: BookListsApi = {
  getAllBookLists: async () => {
    const response = await axios.get<BookList[]>(url);
    const bookLists = parseBookLists(response.data);
    const toReadindex = bookLists.findIndex(
      (list) => list.name === "Do przeczytania" || list.name === "To read",
    );
    if (toReadindex !== -1) {
      const [object] = bookLists.splice(toReadindex, 1);
      bookLists.unshift(object);
    }
    return bookLists;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getUserBookLists: async (userId) => {
    function wait(milliseconds: number) {
      return new Promise((resolve) => setTimeout(resolve, milliseconds));
    }
    await wait(1000);
    return parseBookLists([
      {
        id: "6631fd11d4345a5ee0bff28d",
        userId: "6586c730167d96419b938015",
        name: "My first list",
        books: [
          {
            id: "6613fb003801664c42c9ca96",
            title: "Diuna",
            authorList: [
              {
                id: "6613fa4e3801664c42c9ca8f",
                firstName: "Frank",
                lastName: "Herbert",
              },
            ],
            description:
              "Pierwsza część cyklu „Kroniki Diuny” uznawanego przez wielu fanów SF za najwybitniejsze osiągnięcie tego gatunku literatury. Oszałamiające połączenie przygody oraz mistycyzmu, ekologii i polityki, uhonorowane prestiżowymi nagrodami Nebulą i Hugo. Wydanie nowe i poprawione.\n\nArrakis, zwana Diuną, to jedyne we wszechświecie źródło melanżu. Z rozkazu Padyszacha Imperatora planetę przejmują Atrydzi, zaciekli wrogowie władających nią dotychczas Harkonnenów. Zwycięstwo księcia Leto Atrydy jest jednak pozorne – przejęcie planety ukartowano. W odpowiedzi na atak Imperium i Harkonnenów dziedzic rodu Atrydów Paul staje na czele rdzennych mieszkańców Diuny i sięga po imperialny tron.\n",
            genreList: [
              {
                id: "6613fa6f3801664c42c9ca90",
                name: "Science-fiction",
              },
            ],
            tagList: ["diuna"],
            language: "PL",
            bookCoverId: "6613fb003801664c42c9ca91",
            bookContentId: "6613fb003801664c42c9ca93",
            rateCount: 3,
            rateAverage: 3.3333333333333335,
          },
          {
            id: "657a228c51e9173b80a15b0a",
            title: "Dawno temu w Warszawie ",
            authorList: [
              {
                id: "657a21dd51e9173b80a15b08",
                firstName: "Jakub",
                lastName: "Żulczyk",
              },
            ],
            description:
              "\\nStało się.\\n\\nŚwiat się skończył.\\n\\nNadeszło Groźne i Inne.\\n\\nPrzestańcie się mazać, to dopiero początek.\\n\\nNie zapinajcie pasów. To bez sensu.\\n\\n2014. Jacek Nitecki stoi samotny przed halą odlotów Okęcia. Zaczyna padać deszcz. Dzwoni telefon. Jacek odbiera, myśląc, że jego droga do piekła właśnie się skończyła. Ale ona dopiero się zaczyna.\\n\\n2020. Warszawa wchodzi w kolejną falę pandemii.\\n\\nLockdown zamyka ludzi w ich domach, w ich głowach, w kleszczach lęku. W środku tego szaleństwa Marta Pazińska próbuje walczyć o życie i godność tych, którzy są samotni i bezbronni. Nie rozumie jednak, że cała Warszawa stała się bezbronna jak dziecko. A ci, którzy przez lata czaili się w ciemności, teraz ruszyli po władzę. Idą po nią po trupach dzieciaków, policjantów, polityków. Kości chrzęszczą pod ich stopami.\\n\\nParę lat po wydarzeniach ze Ślepnąc od świateł bohaterowie tamtej powieści schodzą pod powierzchnię miasta, zanurzają się w płynącym pod nim złu. A zło jest zimne. I gęste.",
            genreList: [
              {
                id: "657a225d51e9173b80a15b09",
                name: "Thriller",
              },
              {
                id: "657a27b4a89ec220c4eecf6f",
                name: "Science",
              },
            ],
            tagList: ["Żulczyk"],
            language: null,
            bookCoverId: "65df898265e0f9692d4a54c3",
            bookContentId: "65df898265e0f9692d4a54c5",
            rateCount: 0,
            rateAverage: 0.0,
          },
          {
            id: "6613fcd03801664c42c9caac",
            title: "Rok 1984",
            authorList: [
              {
                id: "6613fc853801664c42c9caa6",
                firstName: "George",
                lastName: "Orwell",
              },
            ],
            description:
              "Jedna z najbardziej przełomowych książek XX wieku. „Rok 1984” nie tylko przedstawia przerażającą wizję możliwej przyszłości, ale także zadaje fundamentalne pytania o naturę władzy, granice wolności indywidualnej oraz cenę, jaką jesteśmy gotowi zapłacić za posiadanie własnego „ja” w świecie, który usiłuje nas zdefiniować.\n\nW dystopijnym świecie, gdzie Wielki Brat nieustannie obserwuje, a wolność myśli jest zbrodnią, Winston Smith walczy o odrobinę prywatności i prawdy. Pracując na rzecz Partii, która manipuluje przeszłością, by kształtować teraźniejszość, Winston odkrywa, że jego jedyną bronią jest myśl. Jego bunt przeciwko totalitarnemu reżimowi staje się podróżą przez zakazane pragnienia, miłość i poszukiwanie wolności.\n",
            genreList: [
              {
                id: "6613fa6f3801664c42c9ca90",
                name: "Science-fiction",
              },
            ],
            tagList: ["1984"],
            language: "PL",
            bookCoverId: "6613fccf3801664c42c9caa7",
            bookContentId: "6613fccf3801664c42c9caa9",
            rateCount: 0,
            rateAverage: 0.0,
          },
          {
            id: "657a25cf51e9173b80a15b11",
            title: "Kasacja",
            authorList: [
              {
                id: "657a246851e9173b80a15b0e",
                firstName: "Remigiusz",
                lastName: "Mróz",
              },
            ],
            description:
              "Manipulacje, intrygi i bezwzględny, ale też fascynujący prawniczy świat...\nSyn biznesmena zostaje oskarżony o zabicie dwóch osób. Sprawa wydaje się oczywista. Potencjalny winowajca spędza bowiem 10 dni zamknięty w swoim mieszkaniu z ciałami ofiar. Sprawę prowadzi Joanna Chyłka, nieprzebierająca w środkach prawniczka, która zrobi wszystko, by odnieść zwycięstwo w batalii sądowej. Pomaga jej młody, zafascynowany przełożoną, aplikant Kordian Oryński. Czy jednak wspólnie zdołają doprowadzić sprawę do szczęśliwego finału? Ich klient zdaje się prowadzić własną grę, której reguły zna tylko on sam. Nie przyznaje się do winy, ale też nie zaprzecza, że jest mordercą. Dwoje prawników zostaje wciągniętych w wir manipulacji, który sięga dalej, niż mogliby przypuszczać.",
            genreList: [
              {
                id: "657a225d51e9173b80a15b09",
                name: "Thriller",
              },
            ],
            tagList: ["Mróz"],
            language: null,
            bookCoverId: "65df862265e0f9692d4a5499",
            bookContentId: "65df862265e0f9692d4a549b",
            rateCount: 0,
            rateAverage: 0.0,
          },
          {
            id: "657a240d51e9173b80a15b0d",
            title: "Wzgórze psów",
            authorList: [
              {
                id: "657a21dd51e9173b80a15b08",
                firstName: "Jakub",
                lastName: "Żulczyk",
              },
            ],
            description:
              'Wznowienie książki autora kultowych powieści Ślepnąc od świateł i Zrób mi jakąś krzywdę oraz współtwórcy serialu „Belfer“ i "Warszawianka"\n\nZimna, ciemna warmińsko-mazurska prowincja. Na jej tle doskonale skonstruowany mroczny thriller: zaskakujący, niepokojący, wciągający od pierwszej strony. Ale to tylko najprostsze odczytanie nowej powieści Żulczyka. Tajemnicze zaginięcia ludzi, makabryczne odkrycia związane z ich odnalezieniem, dramat rodzinny głównego bohatera to pretekst do mistrzowsko nakreślonego portretu lokalnej społeczności oraz uwikłanej w miejscowe układy rodziny. Żulczyk pokazuje, jak ojcowie niszczą swoich synów, mężowie – żony, przyjaciele – przyjaciół. Zajmuje go pamięć o krzywdzie i wybiórczość tej pamięci. Prowincja Polski jako miejsce, w którym widać metafizyczną prawdę o „,polskim losie“, i Warszawa jako miejsce, gdzie przyjezdny z prowincji może wygrać albo przegrać, ale nie może spokojnie żyć. Czy karą za zło może być inne zło? Gdzie jest granica w wymierzaniu sprawiedliwości? Jak zwykle Żulczyka interesuje to, co kryje się pod powierzchnią.\n\nJakub Żulczyk (1983 r.) – pisarz, scenarzysta, felietonista. Pochodzi z Mazur, studiował w Olsztynie i Krakowie, mieszka i pracuje w Warszawie. Zadebiutował w 2006 r. w wydawnictwie Lampa i Iskra Boża książką młodzieżowo-romantyczną Zrób mi jakąś krzywdę. Autor powieści: Radio Armageddon (2008, przeniesiona na deski Teatru Współczesnego we Wrocławiu w 2014), Instytut (2010) i Ślepnąc od świateł (2014, nominowana do Paszportów Polityki i do Gwarancji Kultury) oraz dwóch części fantastyczno- przygodowego cyklu Zmorojewo. Współtwórca popularnego serialu „Belfer“. Razem z Krzysztofem Skoniecznym napisał sześcioodcinkowy miniserial dla telewizji HBO na podstawie swojej powieści Ślepnąc od świateł. Publikował m.in. w: „Polityce“, „,Dzienniku“, „Wprost“ i „Playboyu“.Jego najnowszy projekt to historia przedtawiona w serialu telewizji Skyshowtime pt. "Warszawianka", wyreżyserowana przez Jacka Borcucha.',
            genreList: [
              {
                id: "657a225d51e9173b80a15b09",
                name: "Thriller",
              },
            ],
            tagList: ["Żulczyk"],
            language: null,
            bookCoverId: "65df85b765e0f9692d4a5478",
            bookContentId: "65df85b765e0f9692d4a547a",
            rateCount: 0,
            rateAverage: 0.0,
          },
          {
            id: "657a22f551e9173b80a15b0b",
            title: "Ślepnąc od świateł",
            authorList: [
              {
                id: "657a21dd51e9173b80a15b08",
                firstName: "Jakub",
                lastName: "Żulczyk",
              },
            ],
            description:
              "Zagadkowa, dynamiczna miejska odyseja, pełna zaskakujących zwrotów akcji i splotów wydarzeń, skłaniająca do zastanowienia, co znaczą w dzisiejszych czasach podstawowe wartości: miłość, przyjaźń czy wierność. A może raczej… ile kosztują?\n\nZawsze chodzi wyłącznie o pieniądze. O nic innego. Ktoś może powiedzieć ci, że to niska pobudka. To nieprawda - oświadcza bohater najnowszej powieści Jakuba Żulczyka. Ten młody człowiek przyjechał z Olsztyna do Warszawy, gdzie prawie skończył ASP. By uniknąć powielania egzystencjalnych schematów swoich rówieśników – przyszłych meneli, ludzi mogących w najlepszym razie otrzeć się o warstwy klasy średniej, niepoprawnych idealistów – dokonał życiowego wyboru według własnych upodobań: Zawsze lubiłem ważyć i liczyć.\n\nWaży więc narkotyki i liczy pieniądze jako handlarz kokainy. W dzień śpi, w nocy odbywa samochodowy rajd po mieście, rozprowadzając towar, ale także bezwzględnie i brutalnie ściągając od dłużników pieniądze, przy pomocy odpowiednich ludzi. Jego klientów, zamożnych przedstawicieli elity finansowej i kulturalnej, łączy przekonanie, że: Kokaina i alkohol kochają cię najbardziej na świecie. Bezwarunkowo. Jak matka, jak Jezus Chrystus, zmieniają nocne w miasto w panopticum ludzkich słabości i żądzy.\n\nJakub Żulczyk w poruszający sposób ukazuje współczesną rzeczywistość, zdeformowaną do tego stopnia, że handlarz narkotyków staje się równie niezbędny jak strażak czy lekarz; jest nocnym dostawcą paliwa dla tych, którzy chcą – albo muszą – utrzymać się na powierzchni.\n\nJakub Żulczyk (1983r.) – pisarz, felietonista, scenarzysta. Pochodzi z Mazur, studiował w Olsztynie i Krakowie, mieszka i pracuje w Warszawie. Zadebiutował w 2006 r. w wydawnictwie Lampa i Iskra Boża powieścią młodzieżowo-romantyczną Zrób mi jakąś krzywdę. Autor powieści Radio Armageddon, (2008) i Instytut (2010) oraz dwóch części fantastyczno-przygodowego cyklu o Tytusie Grójeckim Zmorojewo i Świątynia, felietonów i artykułów (m.in. dla „Wprost”, „Dziennika”, „Playboya”, „:Przekroju” i „Tygodnika Powszechnego”), scenariuszy filmowych i telewizyjnych, a także książeczki dla dzieci Zdarzenie nad strumykiem. Stypendysta programu Willa Decjusza, zwycięzca międzynarodowego konkursu na esej Young Euro Connect.",
            genreList: [
              {
                id: "657a225d51e9173b80a15b09",
                name: "Thriller",
              },
            ],
            tagList: ["Żulczyk"],
            language: null,
            bookCoverId: "65df84f765e0f9692d4a546a",
            bookContentId: "65df84f765e0f9692d4a546c",
            rateCount: 0,
            rateAverage: 0.0,
          },
        ],
      },
      {
        id: "66320b81d4345a5ee0bff28e",
        userId: "6586c730167d96419b938015",
        name: "My second list",
        books: [
          {
            id: "6613fb003801664c42c9ca96",
            title: "Diuna",
            authorList: [
              {
                id: "6613fa4e3801664c42c9ca8f",
                firstName: "Frank",
                lastName: "Herbert",
              },
            ],
            description:
              "Pierwsza część cyklu „Kroniki Diuny” uznawanego przez wielu fanów SF za najwybitniejsze osiągnięcie tego gatunku literatury. Oszałamiające połączenie przygody oraz mistycyzmu, ekologii i polityki, uhonorowane prestiżowymi nagrodami Nebulą i Hugo. Wydanie nowe i poprawione.\n\nArrakis, zwana Diuną, to jedyne we wszechświecie źródło melanżu. Z rozkazu Padyszacha Imperatora planetę przejmują Atrydzi, zaciekli wrogowie władających nią dotychczas Harkonnenów. Zwycięstwo księcia Leto Atrydy jest jednak pozorne – przejęcie planety ukartowano. W odpowiedzi na atak Imperium i Harkonnenów dziedzic rodu Atrydów Paul staje na czele rdzennych mieszkańców Diuny i sięga po imperialny tron.\n",
            genreList: [
              {
                id: "6613fa6f3801664c42c9ca90",
                name: "Science-fiction",
              },
            ],
            tagList: ["diuna"],
            language: "PL",
            bookCoverId: "6613fb003801664c42c9ca91",
            bookContentId: "6613fb003801664c42c9ca93",
            rateCount: 3,
            rateAverage: 3.3333333333333335,
          },
          {
            id: "6613fc3d3801664c42c9caa5",
            title: "Bękart",
            authorList: [
              {
                id: "6613fbe93801664c42c9ca97",
                firstName: "Ida",
                lastName: "Jessen",
              },
            ],
            description:
              "Opowieść o walce ludzi z siłami natury, o wielkich marzeniach i jeszcze większych poświęceniach. Na podstawie ebooka „Bękart” został nakręcony duński kandydat do Oscara z Madsem Mikkelsenem w roli głównej.\n\nJutlandia, rok 1754\nNa bezludnym wrzosowisku osiedla się kapitan Ludwig von Kahlen. Zamierza udowodnić, że te pustkowia można ujarzmić i że nadają się one pod uprawę. Jednak bezwzględny właściciel ziemski – Schinkel – twierdzi, że wrzosowiska są jego własnością i nie szczędzi środków, by tego dowieść. Pewnego dnia na te dzikie tereny przybywa również tajemnicza Ann Barbara.\nRozpoczyna się burzliwa i dramatyczna historia o zemście, miłości, zatraceniu i złu w najczystszej postaci. ",
            genreList: [
              {
                id: "662520747f22440bda263acd",
                name: "Non-fiction",
              },
            ],
            tagList: ["bękart"],
            language: "PL",
            bookCoverId: "6625220f7f22440bda263ae0",
            bookContentId: "6625220f7f22440bda263ae2",
            rateCount: 0,
            rateAverage: 0.0,
          },
          {
            id: "6613fd6a3801664c42c9caba",
            title: "Problem trzech ciał",
            authorList: [
              {
                id: "6613fd4d3801664c42c9cab3",
                firstName: "Cixin",
                lastName: "Liu",
              },
            ],
            description:
              "Pierwszy tom trylogii „Wspomnienie o przeszłości Ziemi”. Oszałamiający rozmachem chiński bestseller, porównywany do „Fundacji” i „Diuny”. Wydawniczy fenomen w Stanach Zjednoczonych. Zdobywca Nagrody Hugo dla Najlepszej Powieści 2015.\n\n„Imponująca rozmachem ucieczka od rzeczywistości. Dała mi odpowiednią perspektywę w zmaganiach z Kongresem – nie musiałem się przejmować, wszak kosmici mieli najechać Ziemię!” – Barack Obama, były prezydent USA\n\nPierwszy tom trylogii „Wspomnienie o przeszłości Ziemi”, największego w ostatnich latach wydarzenia w światowej fantastyce naukowej, porównywalnego z klasycznymi cyklami „Fundacja” i „Diuna”. Chiński bestseller, który zyskał ogromny rozgłos w USA.\nW 2015 roku książka otrzymała Nagrodę Hugo, po raz pierwszy w historii przyznanej tłumaczonemu tekstowi. Znalazła się także w finale nagród Nebula, Prometeusza, Locusa, Johna W. Campbella. Mark Zuckerberg, twórca Facebooka, wybrał ją jako jedną z najbardziej wartych przeczytania książek 2015 roku, a prezydent Barack Obama zabrał ją na urlop na Hawajach.\nTajny chiński projekt z czasów Mao przynosi przerażające konsekwencje kilkadziesiąt lat później. Początek XXI wieku – po serii samobójstw wybitnych fizyków śledztwo prowadzi do tajemniczej sieciowej gry „Trzy ciała”, której celem jest uratowanie mieszkańców planety zagrożonej oddziaływaniem grawitacyjnym trzech słońc. Świat tej gry nie jest jednak fikcją...\n",
            genreList: [
              {
                id: "6613fa6f3801664c42c9ca90",
                name: "Science-fiction",
              },
            ],
            tagList: ["problem trzech ciał"],
            language: "PL",
            bookCoverId: "6613fd693801664c42c9cab4",
            bookContentId: "6613fd693801664c42c9cab6",
            rateCount: 0,
            rateAverage: 0.0,
          },
          {
            id: "657a228c51e9173b80a15b0a",
            title: "Dawno temu w Warszawie ",
            authorList: [
              {
                id: "657a21dd51e9173b80a15b08",
                firstName: "Jakub",
                lastName: "Żulczyk",
              },
            ],
            description:
              "\\nStało się.\\n\\nŚwiat się skończył.\\n\\nNadeszło Groźne i Inne.\\n\\nPrzestańcie się mazać, to dopiero początek.\\n\\nNie zapinajcie pasów. To bez sensu.\\n\\n2014. Jacek Nitecki stoi samotny przed halą odlotów Okęcia. Zaczyna padać deszcz. Dzwoni telefon. Jacek odbiera, myśląc, że jego droga do piekła właśnie się skończyła. Ale ona dopiero się zaczyna.\\n\\n2020. Warszawa wchodzi w kolejną falę pandemii.\\n\\nLockdown zamyka ludzi w ich domach, w ich głowach, w kleszczach lęku. W środku tego szaleństwa Marta Pazińska próbuje walczyć o życie i godność tych, którzy są samotni i bezbronni. Nie rozumie jednak, że cała Warszawa stała się bezbronna jak dziecko. A ci, którzy przez lata czaili się w ciemności, teraz ruszyli po władzę. Idą po nią po trupach dzieciaków, policjantów, polityków. Kości chrzęszczą pod ich stopami.\\n\\nParę lat po wydarzeniach ze Ślepnąc od świateł bohaterowie tamtej powieści schodzą pod powierzchnię miasta, zanurzają się w płynącym pod nim złu. A zło jest zimne. I gęste.",
            genreList: [
              {
                id: "657a225d51e9173b80a15b09",
                name: "Thriller",
              },
              {
                id: "657a27b4a89ec220c4eecf6f",
                name: "Science",
              },
            ],
            tagList: ["Żulczyk"],
            language: null,
            bookCoverId: "65df898265e0f9692d4a54c3",
            bookContentId: "65df898265e0f9692d4a54c5",
            rateCount: 0,
            rateAverage: 0.0,
          },
          {
            id: "657a239851e9173b80a15b0c",
            title: "Informacja zwrotna",
            authorList: [
              {
                id: "657a21dd51e9173b80a15b08",
                firstName: "Jakub",
                lastName: "Żulczyk",
              },
            ],
            description:
              'Nazywam się Marcin Kania. Jestem alkoholikiem i zaraz zabiję człowieka.\n\nSyn Marcina Kani, żyjącego z tantiemów byłego muzyka, twórcy jednego z największych polskich hitów, pewnego dnia znika bez śladu. Jedyne, co po sobie pozostawia to zakrwawione prześcieradła. Kania wie, że poprzedniego wieczoru widział się z synem. Jednak prawie nic z tego spotkania nie pamięta. Zapił.\n\nKania, alkoholik leczący się z choroby w ośrodku ,,Jutro", wyrusza w szaleńczą podróż w poszukiwaniu syna. Ta odyseja po mieście, w którym każde z miejsc ma swoja brudną tajemnicę, popchnie go w najmroczniejsze rejony ludzkiego psyche, naprowadzi na trop największej w polskich dziejach afery reprywatyzacyjnej oraz skonfrontuje ze złem, które wyrządził swojej rodzinie.\n\nKlucz do odkupienia i odnalezienia syna tkwi w jego wyniszczonym przez alkohol umyśle. Musi sobie tylko przypomnieć. Jaka będzie informacja zwrotna?\n\nJakub Żulczyk, autor „Wzgórza Psów” i „Ślepnąc od świateł”, jeden z najbardziej rozpoznawalnych i bezkompromisowych autorów młodego pokolenia powraca w swojej najlepszej i najbardziej dojrzałej powieści. W swoistym połączeniu ANTYKRYMINAŁU i dramatu psychologicznego, od którego nie będziecie mogli się oderwać.\n',
            genreList: [
              {
                id: "657a225d51e9173b80a15b09",
                name: "Thriller",
              },
            ],
            tagList: ["Żulczyk"],
            language: null,
            bookCoverId: "65df855665e0f9692d4a5472",
            bookContentId: "65df855665e0f9692d4a5474",
            rateCount: 0,
            rateAverage: 0.0,
          },
          {
            id: "657a24ee51e9173b80a15b0f",
            title: "Iluzjonista",
            authorList: [
              {
                id: "657a246851e9173b80a15b0e",
                firstName: "Remigiusz",
                lastName: "Mróz",
              },
            ],
            description:
              "W 1988 roku Gerard Edling prowadził śledztwo, które zakończyło się ujęciem i skazaniem sprawcy serii zagadkowych zabójstw. Z racji ich tajemniczego charakteru, w kronikach kryminalnych morderca nazywany był Iluzjonistą – długo zwodził śledczych, a zabójstw dokonywał tak, by dowody wskazywały na inne osoby. Jego ofiar nie łączyło nic poza tym, że na ich skórze znajdował się wypalony znak zapytania.\n \nPonad trzydzieści lat później na jednym z opolskich kąpielisk odnalezione zostaje ciało z podpisem Iluzjonisty, a sposób działania sprawcy łudząco przypomina czarną serię, która niegdyś wstrząsnęła miastem. Prowadzenie dochodzenia utrudnia fakt, że akta dawnej sprawy zaginęły, a osoby z nią związane albo milczą, albo znikają w niewyjaśnionych okolicznościach.\n\nJedynym, który może pomóc prokuraturze, jest wydalony ze służby Edling, skrywający własne tajemnice związane z dawnymi wydarzeniami…",
            genreList: [
              {
                id: "657a225d51e9173b80a15b09",
                name: "Thriller",
              },
            ],
            tagList: ["Mróz"],
            language: null,
            bookCoverId: "65df85fa65e0f9692d4a5487",
            bookContentId: "65df85fa65e0f9692d4a5489",
            rateCount: 0,
            rateAverage: 0.0,
          },
          {
            id: "657a253651e9173b80a15b10",
            title: "Behawiorysta",
            authorList: [
              {
                id: "657a246851e9173b80a15b0e",
                firstName: "Remigiusz",
                lastName: "Mróz",
              },
            ],
            description:
              "„Potężna dawka emocji, nieustanne napięcie i fascynujący bohater! Behawiorysta to książka, której nie odłożycie do ostatniej strony!” – Tess Gerritsen\n\nZamachowiec zajmuje przedszkole, grożąc że zabije wychowawców i dzieci. Policja jest bezsilna, a mężczyzna nie przedstawia żadnych żądań. Nikt nie wie, dlaczego wziął zakładników, ani co zamierza osiągnąć. Sytuację komplikuje fakt, że transmisja na żywo z przedszkola pojawia się w internecie.\n\nSłużby w akcie desperacji proszą o pomoc Gerarda Edlinga, byłego prokuratora, który został dyscyplinarnie wydalony ze służby. Edling jest specjalistą od kinezyki, działu nauki zajmującego się badaniem komunikacji niewerbalnej\n\nZnany jest nie tylko z ekscentryzmu, ale także z tego, że potrafi rozwiązać każdą sprawę.\n\nA przynajmniej dotychczas tak było…\n\nRozpoczyna się gra między ścigającym a ściganym, w której tak naprawdę nie wiadomo, kto jest kim.",
            genreList: [
              {
                id: "657a225d51e9173b80a15b09",
                name: "Thriller",
              },
            ],
            tagList: ["Mróz"],
            language: null,
            bookCoverId: "65df860f65e0f9692d4a5490",
            bookContentId: "65df860f65e0f9692d4a5492",
            rateCount: 0,
            rateAverage: 0.0,
          },
          {
            id: "657a25cf51e9173b80a15b11",
            title: "Kasacja",
            authorList: [
              {
                id: "657a246851e9173b80a15b0e",
                firstName: "Remigiusz",
                lastName: "Mróz",
              },
            ],
            description:
              "Manipulacje, intrygi i bezwzględny, ale też fascynujący prawniczy świat...\nSyn biznesmena zostaje oskarżony o zabicie dwóch osób. Sprawa wydaje się oczywista. Potencjalny winowajca spędza bowiem 10 dni zamknięty w swoim mieszkaniu z ciałami ofiar. Sprawę prowadzi Joanna Chyłka, nieprzebierająca w środkach prawniczka, która zrobi wszystko, by odnieść zwycięstwo w batalii sądowej. Pomaga jej młody, zafascynowany przełożoną, aplikant Kordian Oryński. Czy jednak wspólnie zdołają doprowadzić sprawę do szczęśliwego finału? Ich klient zdaje się prowadzić własną grę, której reguły zna tylko on sam. Nie przyznaje się do winy, ale też nie zaprzecza, że jest mordercą. Dwoje prawników zostaje wciągniętych w wir manipulacji, który sięga dalej, niż mogliby przypuszczać.",
            genreList: [
              {
                id: "657a225d51e9173b80a15b09",
                name: "Thriller",
              },
            ],
            tagList: ["Mróz"],
            language: null,
            bookCoverId: "65df862265e0f9692d4a5499",
            bookContentId: "65df862265e0f9692d4a549b",
            rateCount: 0,
            rateAverage: 0.0,
          },
          {
            id: "6613fd243801664c42c9cab2",
            title: "Mesjasz Diuny",
            authorList: [
              {
                id: "6613fa4e3801664c42c9ca8f",
                firstName: "Frank",
                lastName: "Herbert",
              },
            ],
            description:
              "Drugi tom bestsellerowego cyklu „Kroniki Diuny”, uznawanego przez czytelników za jedno z największych osiągnięć literatury SF! Oszałamiające połączenie przygody i mistycyzmu, ekologii i polityki.\n\nFremeni pokonali Harkonnenów i imperialnych sardaukarów, a Paul poślubił księżniczkę Irulanę i zasiadł na tronie Imperium. Pustynna Arrakis, zwana Diuną, jest stolicą wszechświata. Tymczasem stare ośrodki władzy — Bene Gesserit i Gildia Kosmiczna — z pomocą fremeńskiego kapłaństwa i Bene Tleilax zawiązują spisek przeciw nowemu Imperatorowi. Czczony niczym bóg, Paul Muad’Dib wpada w pułapkę, choć zna każdą chwilę swojej przyszłości, każdy swój ruch, każdą decyzję i — przede wszystkim — swój straszliwy koniec…\nDom Wydawniczy REBIS oddaje czytelnikom nowe, poprawione wydanie cyklu „Kroniki Diuny”, który tworzą: – „Diuna”, – „Mesjasz Diuny”, – „Dzieci Diuny”, – „Bóg Imperator Diuny”, – „Heretycy Diuny” i – „Kapitularz Diuną”.",
            genreList: [
              {
                id: "6613fa6f3801664c42c9ca90",
                name: "Science-fiction",
              },
            ],
            tagList: ["diuna"],
            language: "PL",
            bookCoverId: "6613fd243801664c42c9caad",
            bookContentId: "6613fd243801664c42c9caaf",
            rateCount: 0,
            rateAverage: 0.0,
          },
          {
            id: "657a22f551e9173b80a15b0b",
            title: "Ślepnąc od świateł",
            authorList: [
              {
                id: "657a21dd51e9173b80a15b08",
                firstName: "Jakub",
                lastName: "Żulczyk",
              },
            ],
            description:
              "Zagadkowa, dynamiczna miejska odyseja, pełna zaskakujących zwrotów akcji i splotów wydarzeń, skłaniająca do zastanowienia, co znaczą w dzisiejszych czasach podstawowe wartości: miłość, przyjaźń czy wierność. A może raczej… ile kosztują?\n\nZawsze chodzi wyłącznie o pieniądze. O nic innego. Ktoś może powiedzieć ci, że to niska pobudka. To nieprawda - oświadcza bohater najnowszej powieści Jakuba Żulczyka. Ten młody człowiek przyjechał z Olsztyna do Warszawy, gdzie prawie skończył ASP. By uniknąć powielania egzystencjalnych schematów swoich rówieśników – przyszłych meneli, ludzi mogących w najlepszym razie otrzeć się o warstwy klasy średniej, niepoprawnych idealistów – dokonał życiowego wyboru według własnych upodobań: Zawsze lubiłem ważyć i liczyć.\n\nWaży więc narkotyki i liczy pieniądze jako handlarz kokainy. W dzień śpi, w nocy odbywa samochodowy rajd po mieście, rozprowadzając towar, ale także bezwzględnie i brutalnie ściągając od dłużników pieniądze, przy pomocy odpowiednich ludzi. Jego klientów, zamożnych przedstawicieli elity finansowej i kulturalnej, łączy przekonanie, że: Kokaina i alkohol kochają cię najbardziej na świecie. Bezwarunkowo. Jak matka, jak Jezus Chrystus, zmieniają nocne w miasto w panopticum ludzkich słabości i żądzy.\n\nJakub Żulczyk w poruszający sposób ukazuje współczesną rzeczywistość, zdeformowaną do tego stopnia, że handlarz narkotyków staje się równie niezbędny jak strażak czy lekarz; jest nocnym dostawcą paliwa dla tych, którzy chcą – albo muszą – utrzymać się na powierzchni.\n\nJakub Żulczyk (1983r.) – pisarz, felietonista, scenarzysta. Pochodzi z Mazur, studiował w Olsztynie i Krakowie, mieszka i pracuje w Warszawie. Zadebiutował w 2006 r. w wydawnictwie Lampa i Iskra Boża powieścią młodzieżowo-romantyczną Zrób mi jakąś krzywdę. Autor powieści Radio Armageddon, (2008) i Instytut (2010) oraz dwóch części fantastyczno-przygodowego cyklu o Tytusie Grójeckim Zmorojewo i Świątynia, felietonów i artykułów (m.in. dla „Wprost”, „Dziennika”, „Playboya”, „:Przekroju” i „Tygodnika Powszechnego”), scenariuszy filmowych i telewizyjnych, a także książeczki dla dzieci Zdarzenie nad strumykiem. Stypendysta programu Willa Decjusza, zwycięzca międzynarodowego konkursu na esej Young Euro Connect.",
            genreList: [
              {
                id: "657a225d51e9173b80a15b09",
                name: "Thriller",
              },
            ],
            tagList: ["Żulczyk"],
            language: null,
            bookCoverId: "65df84f765e0f9692d4a546a",
            bookContentId: "65df84f765e0f9692d4a546c",
            rateCount: 0,
            rateAverage: 0.0,
          },
        ],
      },
      {
        id: "6633b8f81f119d8fdac1f336",
        userId: "6586c730167d96419b938015",
        name: "Do przeczytania",
        books: [
          {
            id: "661455298b56bc58774a607d",
            title: "Metro 2033",
            authorList: [
              {
                id: "661454f48b56bc58774a6061",
                firstName: "Dmitry",
                lastName: "Glukhovsky",
              },
            ],
            description:
              "Czy kiedykolwiek przyszło ci do głowy, że ostatni epizod historii cywilizacji rozegra się w mrocznej atmosferze moskiewskiego metra? Jeśli nie, koniecznie sięgnij po thriller SF Dmitry Glukhovsky’ego.\n\nRok 2033. W wyniku konfliktu atomowego świat uległ zagładzie. Ocaleli tylko nieliczni, chroniący się w moskiewskim metrze, które dzięki unikalnej konstrukcji stało się najprawdopodobniej ostatnim przyczółkiem ludzkości. Na mrocznych stacjach, rozświetlanych światłami awaryjnymi i blaskiem ognisk, ludzie próbują wieść życie zbliżone do tego sprzed katastrofy. Tworzą mikropaństwa spajane ideologią, religią czy po prostu ochroną filtrów wodnych... Zawierają sojusze, toczą wojny.\nMłody mężczyzna o imieniu Artem otrzymuje zadanie specjalne. Musi przedostać się do stacji Polis, serca moskiewskiego metra, aby przekazać ostrzeżenie o nowym niebezpieczeństwie. Od powodzenia jego misji zależy przyszłość nie tylko peryferyjnej stacji, ale być może całej ocalałej ludzkości.\n„Metro 2033” kultowy już bestseller rosyjskiego pisarza zawładnął wyobraźnią ponad dwuipółmilionowej rzeszy czytelników. Wartka akcja i niezwykle sugestywnie przedstawiony świat przykuły uwagę nie tylko oddanych fanów SF. To coś więcej niż wspaniała rozrywka i uczta dla czytelnika. To także portret człowieka u schyłku cywilizacji, przejmująca analiza jego niezmiennej natury. To obraz świata po końcu świata.\nObecne wydanie bestsellerowej powieści zostało wzbogacone o „Ewangelię według Artema” pióra samego Glukhovsky’ego oraz zdjęcia przedstawiające autora z sesji promującej rosyjskie wydanie „Metra 2033”.",
            genreList: [
              {
                id: "6613fa6f3801664c42c9ca90",
                name: "Science-fiction",
              },
            ],
            tagList: ["metro 2033"],
            language: "PL",
            bookCoverId: "661455288b56bc58774a6062",
            bookContentId: "661455288b56bc58774a6064",
            rateCount: 1,
            rateAverage: 1.0,
          },
          {
            id: "6613fcd03801664c42c9caac",
            title: "Rok 1984",
            authorList: [
              {
                id: "6613fc853801664c42c9caa6",
                firstName: "George",
                lastName: "Orwell",
              },
            ],
            description:
              "Jedna z najbardziej przełomowych książek XX wieku. „Rok 1984” nie tylko przedstawia przerażającą wizję możliwej przyszłości, ale także zadaje fundamentalne pytania o naturę władzy, granice wolności indywidualnej oraz cenę, jaką jesteśmy gotowi zapłacić za posiadanie własnego „ja” w świecie, który usiłuje nas zdefiniować.\n\nW dystopijnym świecie, gdzie Wielki Brat nieustannie obserwuje, a wolność myśli jest zbrodnią, Winston Smith walczy o odrobinę prywatności i prawdy. Pracując na rzecz Partii, która manipuluje przeszłością, by kształtować teraźniejszość, Winston odkrywa, że jego jedyną bronią jest myśl. Jego bunt przeciwko totalitarnemu reżimowi staje się podróżą przez zakazane pragnienia, miłość i poszukiwanie wolności.\n",
            genreList: [
              {
                id: "6613fa6f3801664c42c9ca90",
                name: "Science-fiction",
              },
            ],
            tagList: ["1984"],
            language: "PL",
            bookCoverId: "6613fccf3801664c42c9caa7",
            bookContentId: "6613fccf3801664c42c9caa9",
            rateCount: 0,
            rateAverage: 0.0,
          },
          {
            id: "657a285ea89ec220c4eecf72",
            title: " Jeszcze krótsza historia czasu ",
            authorList: [
              {
                id: "657a268551e9173b80a15b12",
                firstName: "Stephen",
                lastName: "Hawking",
              },
            ],
            description:
              'Przystępniejsza wersja klasyki literatury popularnonaukowej\nBardziej zwięzła\nIlustrowana\nUzupełniona o najnowsze wyniki badań\n\nKrótka historia czasu, światowy bestseller Stephena Hawkinga, weszła do kanonu literatury popularnonaukowej. Do jej sukcesu przyczyniły się zarówno renoma autora, jak i zagadnienia, którymi się w książce zajmuje: natura przestrzeni i czasu, rola Boga w akcie stworzenia, historia oraz przyszłość wszechświata. Czytelnicy wielokrotnie zwracali uwagę profesorowi Hawkingowi na trudności ze zrozumieniem niektórych spośród najbardziej istotnych koncepcji omawianych w jego książce.\n\nTakie też były przyczyny powstania Jeszcze krótszej historii czasu - dążenie autora do uczynienia jej zawartości bardziej przystępnej dla czytelników, a także uzupełnienie o najnowsze obserwacje oraz odkrycia naukowe.\n\nNiniejsza książka jest wprawdzie w najbardziej dosłownym sensie "krótsza", lecz niektóre spośród głównych zagadnień są w rzeczywistości potraktowane bardziej szczegółowo niż pierwotnie, pominięto natomiast pewne czysto techniczne zagadnienia, takie jak choćby matematyka chaotycznych warunków brzegowych. Jednak niektórym spośród bardziej popularnych zagadnień - między innymi teorii względności, zakrzywieniu czasoprzestrzeni, teorii kwantowej - które były trudne do zrozumienia, ponieważ były porozrzucane w różnych częściach książki, poświęcono osobne rozdziały.\n\nZmiany te pozwoliły autorom rozwinąć szczególnie interesujące tematy, jak również włączyć do książki wyniki bieżących badań, od najnowszych odkryć w teorii strun po fascynujące osiągnięcia w poszukiwaniach jednolitej teorii wszystkich sił natury. Podobnie jak poprzednie wydania książki - a może nawet w większym stopniu - Jeszcze krótsza historia czasu będzie dla niespecjalistów przewodnikiem po aktualnych tematach badań, odkryciach oraz poszukiwaniach tajemnic natury i sekretów kryjących się w zakamarkach przestrzeni i czasu.\n\nTekst uzupełnia trzydzieści siedem kolorowych ilustracji, które czynią z Jeszcze krótszej historii czasu równie wartościową pozycję literatury popularnonaukowej, jak jej poprzedniczka.',
            genreList: [
              {
                id: "657a27b4a89ec220c4eecf6f",
                name: "Science",
              },
            ],
            tagList: ["Hawking"],
            language: null,
            bookCoverId: "65df86bc65e0f9692d4a54b7",
            bookContentId: "65df86bc65e0f9692d4a54b9",
            rateCount: 0,
            rateAverage: 0.0,
          },
          {
            id: "6625257f7f22440bda263b0c",
            title: "Polska na wojnie",
            authorList: [
              {
                id: "662525557f22440bda263b06",
                firstName: "Zbigniew",
                lastName: "Parafianowicz",
              },
            ],
            description:
              "Przyjrzyjmy się bliżej temu, co działo się za kulisami oficjalnej polityki w Polsce po wybuchu wojny na Ukrainie – od Pałacu Prezydenckiego, przez polskie służby specjalne, po wojsko. Odkryjmy, jak wielkie konflikty i małostkowe spory wpłynęły na relacje między Andrzejem Dudą a Wołodymyrem Zełenskim, a także jak ich konsekwencje zaważyły na losach Polski.\n\nCo działo się w Pałacu Prezydenckim, w polskich służbach i w wojsku po wybuchu wojny na Ukrainie? Czy między Andrzejem Dudą a Wołodymyrem Zełenskim była prawdziwa przyjaźń? Jak małostkowe konflikty po kilku miesiącach wspólnej gry wdarły się do wielkiej polityki i co z tego wynikło?\n\nNieznane fakty, kulisy rozmów z Ukraińcami, Amerykanami, Niemcami, pokazują i wielkość, i małość polskiej polityki.\n",
            genreList: [
              {
                id: "6614544e8b56bc58774a6059",
                name: "Journalism",
              },
            ],
            tagList: ["polska"],
            language: "PL",
            bookCoverId: "6625257f7f22440bda263b07",
            bookContentId: "6625257f7f22440bda263b09",
            rateCount: 0,
            rateAverage: 0.0,
          },
          {
            id: "662527057f22440bda263b22",
            title: "Stella Maris",
            authorList: [
              {
                id: "662525ed7f22440bda263b0d",
                firstName: "Cormac",
                lastName: "McCarthy",
              },
            ],
            description:
              "Co jest prawdą, a co złudzeniem? Dzika i złowroga eksploracja nauki podważająca nasze pojęcia Boga, prawdy i istnienia. Studium żałoby i nieuleczalnej tęsknoty.\n\n„Gdybyś nie została matematykiem, kim chciałabyś być?\nTrupem”.\nJesienią 1972 roku do zakładu psychiatrycznego Stella Maris zgłasza się dwudziestoletnia Alicia Western, doktorantka na Wydziale Matematyki Uniwersytetu Chicagowskiego i genialna skrzypaczka, córka naukowca, który współpracował z Oppenheimerem przy Projekcie Manhattan. Cierpi na depresję i ma halucynacje. W rejestracji usiłuje oddać reklamówkę z czterdziestoma tysiącami dolarów. Uciekła z Włoch, gdzie jej brat Bobby, uzdolniony fizyk i kierowca Formuły 2 leży w śpiączce po wypadku na torze rajdowym. Alicia kategorycznie odmawia rozmów o nim. Terapeucie opowiada o dzieciństwie w Los Alamos, barwach liczb, mechanice kwantowej, Schopenhauerze i zakazanych marzeniach. W tym intelektualnym sparingu to pacjentka jest górą i nigdy nie wiadomo, kiedy kłamie, a kiedy odsłania się.\n\nPo latach milczenia wybitny amerykański prozaik, laureat Nagrody Pulitzera i autor kultowej Drogi powraca z mistrzowską dylogią. Pasażer i Stella Maris są jak dwie strony lustra, a prawda jednej powieści zdaje się zaprzeczać prawdziwości drugiej.\n\n„Od pięćdziesięciu lat planowałem powieść o kobiecie. Nigdy nie będę wystarczająco kompetentny, by ją napisać, ale w pewnym momencie trzeba spróbować”. Cormac McCarthy\n„Bobby i Alicia – Orestes i Elektra naszych czasów, rodzeństwo z przeklętej rodziny, uciekające przed Furiami. Portret tych dwojga skazanych na to, by nigdy nie być razem, jest oszałamiającym osiągnięciem”. „The Scotsman”",
            genreList: [
              {
                id: "662526057f22440bda263b0e",
                name: "Novel",
              },
            ],
            tagList: ["McCarthy"],
            language: "PL",
            bookCoverId: "662527057f22440bda263b1c",
            bookContentId: "662527057f22440bda263b1e",
            rateCount: 0,
            rateAverage: 0.0,
          },
          {
            id: "6613fd243801664c42c9cab2",
            title: "Mesjasz Diuny",
            authorList: [
              {
                id: "6613fa4e3801664c42c9ca8f",
                firstName: "Frank",
                lastName: "Herbert",
              },
            ],
            description:
              "Drugi tom bestsellerowego cyklu „Kroniki Diuny”, uznawanego przez czytelników za jedno z największych osiągnięć literatury SF! Oszałamiające połączenie przygody i mistycyzmu, ekologii i polityki.\n\nFremeni pokonali Harkonnenów i imperialnych sardaukarów, a Paul poślubił księżniczkę Irulanę i zasiadł na tronie Imperium. Pustynna Arrakis, zwana Diuną, jest stolicą wszechświata. Tymczasem stare ośrodki władzy — Bene Gesserit i Gildia Kosmiczna — z pomocą fremeńskiego kapłaństwa i Bene Tleilax zawiązują spisek przeciw nowemu Imperatorowi. Czczony niczym bóg, Paul Muad’Dib wpada w pułapkę, choć zna każdą chwilę swojej przyszłości, każdy swój ruch, każdą decyzję i — przede wszystkim — swój straszliwy koniec…\nDom Wydawniczy REBIS oddaje czytelnikom nowe, poprawione wydanie cyklu „Kroniki Diuny”, który tworzą: – „Diuna”, – „Mesjasz Diuny”, – „Dzieci Diuny”, – „Bóg Imperator Diuny”, – „Heretycy Diuny” i – „Kapitularz Diuną”.",
            genreList: [
              {
                id: "6613fa6f3801664c42c9ca90",
                name: "Science-fiction",
              },
            ],
            tagList: ["diuna"],
            language: "PL",
            bookCoverId: "6613fd243801664c42c9caad",
            bookContentId: "6613fd243801664c42c9caaf",
            rateCount: 0,
            rateAverage: 0.0,
          },
        ],
      },
      {
        id: "663640cfda9abb16fc5074b4",
        userId: "6586c730167d96419b938015",
        name: "Nowa lista",
        books: [
          {
            id: "657a22f551e9173b80a15b0b",
            title: "Ślepnąc od świateł",
            authorList: [
              {
                id: "657a21dd51e9173b80a15b08",
                firstName: "Jakub",
                lastName: "Żulczyk",
              },
            ],
            description:
              "Zagadkowa, dynamiczna miejska odyseja, pełna zaskakujących zwrotów akcji i splotów wydarzeń, skłaniająca do zastanowienia, co znaczą w dzisiejszych czasach podstawowe wartości: miłość, przyjaźń czy wierność. A może raczej… ile kosztują?\n\nZawsze chodzi wyłącznie o pieniądze. O nic innego. Ktoś może powiedzieć ci, że to niska pobudka. To nieprawda - oświadcza bohater najnowszej powieści Jakuba Żulczyka. Ten młody człowiek przyjechał z Olsztyna do Warszawy, gdzie prawie skończył ASP. By uniknąć powielania egzystencjalnych schematów swoich rówieśników – przyszłych meneli, ludzi mogących w najlepszym razie otrzeć się o warstwy klasy średniej, niepoprawnych idealistów – dokonał życiowego wyboru według własnych upodobań: Zawsze lubiłem ważyć i liczyć.\n\nWaży więc narkotyki i liczy pieniądze jako handlarz kokainy. W dzień śpi, w nocy odbywa samochodowy rajd po mieście, rozprowadzając towar, ale także bezwzględnie i brutalnie ściągając od dłużników pieniądze, przy pomocy odpowiednich ludzi. Jego klientów, zamożnych przedstawicieli elity finansowej i kulturalnej, łączy przekonanie, że: Kokaina i alkohol kochają cię najbardziej na świecie. Bezwarunkowo. Jak matka, jak Jezus Chrystus, zmieniają nocne w miasto w panopticum ludzkich słabości i żądzy.\n\nJakub Żulczyk w poruszający sposób ukazuje współczesną rzeczywistość, zdeformowaną do tego stopnia, że handlarz narkotyków staje się równie niezbędny jak strażak czy lekarz; jest nocnym dostawcą paliwa dla tych, którzy chcą – albo muszą – utrzymać się na powierzchni.\n\nJakub Żulczyk (1983r.) – pisarz, felietonista, scenarzysta. Pochodzi z Mazur, studiował w Olsztynie i Krakowie, mieszka i pracuje w Warszawie. Zadebiutował w 2006 r. w wydawnictwie Lampa i Iskra Boża powieścią młodzieżowo-romantyczną Zrób mi jakąś krzywdę. Autor powieści Radio Armageddon, (2008) i Instytut (2010) oraz dwóch części fantastyczno-przygodowego cyklu o Tytusie Grójeckim Zmorojewo i Świątynia, felietonów i artykułów (m.in. dla „Wprost”, „Dziennika”, „Playboya”, „:Przekroju” i „Tygodnika Powszechnego”), scenariuszy filmowych i telewizyjnych, a także książeczki dla dzieci Zdarzenie nad strumykiem. Stypendysta programu Willa Decjusza, zwycięzca międzynarodowego konkursu na esej Young Euro Connect.",
            genreList: [
              {
                id: "657a225d51e9173b80a15b09",
                name: "Thriller",
              },
            ],
            tagList: ["Żulczyk"],
            language: null,
            bookCoverId: "65df84f765e0f9692d4a546a",
            bookContentId: "65df84f765e0f9692d4a546c",
            rateCount: 0,
            rateAverage: 0.0,
          },
          {
            id: "657a239851e9173b80a15b0c",
            title: "Informacja zwrotna",
            authorList: [
              {
                id: "657a21dd51e9173b80a15b08",
                firstName: "Jakub",
                lastName: "Żulczyk",
              },
            ],
            description:
              'Nazywam się Marcin Kania. Jestem alkoholikiem i zaraz zabiję człowieka.\n\nSyn Marcina Kani, żyjącego z tantiemów byłego muzyka, twórcy jednego z największych polskich hitów, pewnego dnia znika bez śladu. Jedyne, co po sobie pozostawia to zakrwawione prześcieradła. Kania wie, że poprzedniego wieczoru widział się z synem. Jednak prawie nic z tego spotkania nie pamięta. Zapił.\n\nKania, alkoholik leczący się z choroby w ośrodku ,,Jutro", wyrusza w szaleńczą podróż w poszukiwaniu syna. Ta odyseja po mieście, w którym każde z miejsc ma swoja brudną tajemnicę, popchnie go w najmroczniejsze rejony ludzkiego psyche, naprowadzi na trop największej w polskich dziejach afery reprywatyzacyjnej oraz skonfrontuje ze złem, które wyrządził swojej rodzinie.\n\nKlucz do odkupienia i odnalezienia syna tkwi w jego wyniszczonym przez alkohol umyśle. Musi sobie tylko przypomnieć. Jaka będzie informacja zwrotna?\n\nJakub Żulczyk, autor „Wzgórza Psów” i „Ślepnąc od świateł”, jeden z najbardziej rozpoznawalnych i bezkompromisowych autorów młodego pokolenia powraca w swojej najlepszej i najbardziej dojrzałej powieści. W swoistym połączeniu ANTYKRYMINAŁU i dramatu psychologicznego, od którego nie będziecie mogli się oderwać.\n',
            genreList: [
              {
                id: "657a225d51e9173b80a15b09",
                name: "Thriller",
              },
            ],
            tagList: ["Żulczyk"],
            language: null,
            bookCoverId: "65df855665e0f9692d4a5472",
            bookContentId: "65df855665e0f9692d4a5474",
            rateCount: 0,
            rateAverage: 0.0,
          },
          {
            id: "657a240d51e9173b80a15b0d",
            title: "Wzgórze psów",
            authorList: [
              {
                id: "657a21dd51e9173b80a15b08",
                firstName: "Jakub",
                lastName: "Żulczyk",
              },
            ],
            description:
              'Wznowienie książki autora kultowych powieści Ślepnąc od świateł i Zrób mi jakąś krzywdę oraz współtwórcy serialu „Belfer“ i "Warszawianka"\n\nZimna, ciemna warmińsko-mazurska prowincja. Na jej tle doskonale skonstruowany mroczny thriller: zaskakujący, niepokojący, wciągający od pierwszej strony. Ale to tylko najprostsze odczytanie nowej powieści Żulczyka. Tajemnicze zaginięcia ludzi, makabryczne odkrycia związane z ich odnalezieniem, dramat rodzinny głównego bohatera to pretekst do mistrzowsko nakreślonego portretu lokalnej społeczności oraz uwikłanej w miejscowe układy rodziny. Żulczyk pokazuje, jak ojcowie niszczą swoich synów, mężowie – żony, przyjaciele – przyjaciół. Zajmuje go pamięć o krzywdzie i wybiórczość tej pamięci. Prowincja Polski jako miejsce, w którym widać metafizyczną prawdę o „,polskim losie“, i Warszawa jako miejsce, gdzie przyjezdny z prowincji może wygrać albo przegrać, ale nie może spokojnie żyć. Czy karą za zło może być inne zło? Gdzie jest granica w wymierzaniu sprawiedliwości? Jak zwykle Żulczyka interesuje to, co kryje się pod powierzchnią.\n\nJakub Żulczyk (1983 r.) – pisarz, scenarzysta, felietonista. Pochodzi z Mazur, studiował w Olsztynie i Krakowie, mieszka i pracuje w Warszawie. Zadebiutował w 2006 r. w wydawnictwie Lampa i Iskra Boża książką młodzieżowo-romantyczną Zrób mi jakąś krzywdę. Autor powieści: Radio Armageddon (2008, przeniesiona na deski Teatru Współczesnego we Wrocławiu w 2014), Instytut (2010) i Ślepnąc od świateł (2014, nominowana do Paszportów Polityki i do Gwarancji Kultury) oraz dwóch części fantastyczno- przygodowego cyklu Zmorojewo. Współtwórca popularnego serialu „Belfer“. Razem z Krzysztofem Skoniecznym napisał sześcioodcinkowy miniserial dla telewizji HBO na podstawie swojej powieści Ślepnąc od świateł. Publikował m.in. w: „Polityce“, „,Dzienniku“, „Wprost“ i „Playboyu“.Jego najnowszy projekt to historia przedtawiona w serialu telewizji Skyshowtime pt. "Warszawianka", wyreżyserowana przez Jacka Borcucha.',
            genreList: [
              {
                id: "657a225d51e9173b80a15b09",
                name: "Thriller",
              },
            ],
            tagList: ["Żulczyk"],
            language: null,
            bookCoverId: "65df85b765e0f9692d4a5478",
            bookContentId: "65df85b765e0f9692d4a547a",
            rateCount: 0,
            rateAverage: 0.0,
          },
        ],
      },
    ]);
  },
  getBookList: async (id) => {
    const response = await axios.get<BookList>(`${url}/${id}`);
    return parseBookList(response.data);
  },
  changeBookListName: async (data) => {
    await axios.patch(`${url}/${data.listId}`, String(data.newName), {
      headers: { "Content-Type": "text/plain" },
    });
  },
  addBookToList: async (data) => {
    const response = await axios.patch<BookList>(
      `${url}/add/${data.listId}/${data.bookId}`,
      {
        headers: { "Content-Type": "text/plain" },
      },
    );
    return response.data;
  },
  addBooksToList: async (data) => {
    for (const bookId of data.bookIdList) {
      await bookListsApi.addBookToList({ bookId, listId: data.listId });
    }
  },
  removeBookFromList: async (data) => {
    const response = await axios.patch<BookList>(
      `${url}/remove/${data.listId}/${data.bookId}`,
      {
        headers: { "Content-Type": "text/plain" },
      },
    );
    return response.data;
  },
  removeBooksFromList: async (data) => {
    for (const bookId of data.bookIdList) {
      await bookListsApi.removeBookFromList({ bookId, listId: data.listId });
    }
  },
  addBookList: async (data) => {
    const response = await axios.post<BookList>(url, data);
    return response.data;
  },
  deleteBookList: async (id) => {
    await axios.delete(`${url}/${id}`);
  },
};

export default bookListsApi;
