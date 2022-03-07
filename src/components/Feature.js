import React, { Fragment } from 'react';

// Don't touch this import
import { fetchQueryResultsFromTermAndValue } from '../api';

/**
 * We need a new component called Searchable which:
 * 
 * Has a template like this:
 * 
 * <span className="content">
 *  <a href="#" onClick={async (event) => {}}>SOME SEARCH TERM</a>
 * </span>
 *
 * You'll need to read searchTerm, searchValue, setIsLoading, and setSearchResults off of the props.
 * 
 * When someone clicks the anchor tag, you should:
 * 
 * - preventDefault on the event
 * - call setIsLoading, set it to true
 * 
 * Then start a try/catch/finally block:
 * 
 * try:
 *  - await the result of fetchQueryResultsFromTermAndValue, passing in searchTerm and searchValue
 *  - send the result to setSearchResults (which will update the Preview component)
 * catch: 
 *  - console.error the error
 * finally:
 *  - call setIsLoading, set it to false
 */
const Searchable = (props) => {
    const {searchTerm, searchValue, setIsLoading, setSearchResults} = props;
  
    return(
     <span className="content">
      <a href="#" onClick={async (event) => {
          event.preventDefault();
          setIsLoading(true)
          try{
              const result = await fetchQueryResultsFromTermAndValue(searchTerm,searchValue);
              setSearchResults(result);
          }
          catch(err){
              console.error(err);
          }
          finally{
              setIsLoading(false);
          }
      }}>{searchValue}</a>
     </span>
    )
}

/**
 * We need a new component called Feature which looks like this when no featuredResult is passed in as a prop:
 * 
 * <main id="feature"></main>
 * 
 * And like this when one is:
 * 
 * <main id="feature">
 *   <div className="object-feature">
 *     <header>
 *       <h3>OBJECT TITLE</h3>
 *       <h4>WHEN IT IS DATED</h4>
 *     </header>
 *     <section className="facts">
 *       <span className="title">FACT NAME</span>
 *       <span className="content">FACT VALUE</span>
 *       <span className="title">NEXT FACT NAME</span>
 *       <span className="content">NEXT FACT VALUE</span>
 *     </section>
 *     <section className="photos">
 *       <img src=IMAGE_URL alt=SOMETHING_WORTHWHILE />
 *     </section>
 *   </div>
 * </main>
 * 
 * The different facts look like this: title, dated, images, primaryimageurl, description, culture, style, 
 * technique, medium, dimensions, people, department, division, contact, creditline
 * 
 * The <Searchable /> ones are: culture, technique, medium (first toLowerCase it), and person.displayname (one for each PEOPLE)
 * 
 * NOTE: people and images are likely to be arrays, and will need to be mapped over if they exist
 * 
 * This component should be exported as default.
 */
 const Feature = (props) => {
    const {featuredResult, setSearchResults, setIsLoading} = props;
    const {title, dated, images, primaryimageurl, description, culture, style,
      technique, medium, dimensions, people, department, division, contact, creditline} = featuredResult||{}
   
     return (
         <div>
         {featuredResult ? (<main id="feature">
         <div className="object-feature">
            <header>
                <h3>{featuredResult.title}</h3>
                <h4>{featuredResult.dated}</h4>
           </header>
            <section className="facts">
            <span className="title">{"Culture"}</span>

            <Searchable setIsLoading = {setIsLoading} setSearchResults = {setSearchResults} searchTerm = {"Culture"} searchValue = {culture}/>

            <span className="title">Technique</span>

            <Searchable setIsLoading = {setIsLoading} setSearchResults = {setSearchResults} searchTerm = {"Technique"} searchValue = {technique}/>

            <span className="title">Medium</span>

            <Searchable setIsLoading = {setIsLoading} setSearchResults = {setSearchResults} searchTerm = {"Medium"} searchValue = {medium}/>

           {people? people.map((person) => {
               return (<Searchable setIsLoading = {setIsLoading} setSearchResults = {setSearchResults} searchTerm = {"Person"} searchValue = {person.displayname}/>)
           }):null}
           {description?
            <>
             <span className="title">Description </span>
             <span className="content">{description}</span>
            </> : null}

            {style?
            <>
             <span className="title">Style </span>
             <span className="content">{style}</span>
             </>: null}
  
             {dimensions?
             <>
             <span className="title">Dimensions </span>
             <span className="content">{dimensions}</span>
            </> :null}
  
            {department?
            <>
             <span className="title">Department </span>
             <span className="content">{department}</span>
            </> :null}
  
            {contact?
            <>
             <span className="title">Contact </span>
             <span className="content">{contact}</span>
            </> :null}
            {division?
            <>
             <span className="title">Division </span>
             <span className="content">{division}</span>
            </>  :null}
          
            {creditline?
            <>
             <span className="title">Credit Line</span>
             <span className="content">{creditline}</span>
            </> :null}
            </section>
            <section className="photos">
              <img src={primaryimageurl} alt={title}/>
            </section>
         </div>
        </main> ):(<main id="feature"></main>)}
   </div>
    )}
export default Feature;