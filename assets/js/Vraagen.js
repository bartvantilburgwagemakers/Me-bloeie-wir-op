
export function GetQuestions() {
    var questions =[];

    var draakVraag1 = NewVraag("1", "Onlosmakelijk aan de draak verbonden: sint <br/> <br/> Nicolaas= 1 " +
        "<br/> Antonius= 2  <br/>Petrus= 3 <br/> Joris= 4 <br/> Jakobus= 5 <br/>  Walrik= 6 <br/> Maarten= 7 <br/> Anna= 8", "11", "het zijn er 2+");
    questions.push(draakVraag1);
    var vraag2 = NewVraag("2", "Wat is de laatste zin en officiële tittel die bij dit beeld hoort?", "Kek naar oe eige", "kijk in de spiegel", "../Assets/opdracht2.jpg");
    questions.push(vraag2);
    var vraag3 = NewVraag("3", "Ik hang boven het toilet", "de teerkastje", "Je bevond je bij de saeck.");
    questions.push(vraag3);
    var vraag4 = NewVraag("4", "Onder welke kemissie vallen de: prins, gròòtste boer,steketee en de nar?","protocol","O.J. punctuel verwijst er naar in zijn carnavalsnummer")
    questions.push(vraag4);
    var hetGeitje = NewVraag("5", "51°29'50.5\"N 4°17'25.9\"E ", "de geit van mie d’n os", "we ere het ieder jaar");
    questions.push(hetGeitje);
    var vraag7 = NewVraag("7", "", "tussen de schuifdeuren", "kaartjes, weekend vooraf","../Assets/opdracht7.png");
    questions.push(vraag7);
    var vraag8 = NewVraag("8", "kaart, ei, verdwijnen, wier, koffiedik, verschijnen", "wana 1976" , "lied + jaar");
    questions.push(vraag8);

    return questions;
}
function NewVraag(id, vraag, antwoord, hint, media_uri) {
    return {
        _id: id,
        Vraag: vraag,
        Antwoord: antwoord,
        Hint: hint,
        IsJuistBeandwoord: false,
        Media_uri: media_uri,
    }
}