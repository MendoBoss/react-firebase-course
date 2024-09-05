import { useEffect, useState } from 'react';
import './App.css';
import { Auth } from './components/Auth';
import { db, auth, storage } from './config/firebase';
import { getDocs, collection, addDoc,deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { ref,uploadBytes } from 'firebase/storage';


function App() {

  const[movieList, setMovieList]=useState([]);

  // nouveau film
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newMovieDate, setNewMovieDate] = useState(0);
  const [newMovieOscar, setNewMovieOscar] = useState(false);
  // Modification d'un film
  const [updateTitle, setUpdateTitle] = useState("");
  // Stockage d'un fichier
  const [fileUpload, setFileUpload] = useState(null);
  let today = new Date();
  let date=today.getTime();

  const moviesCollectionRef = collection(db,"movies")

  const getMovieList = async()=>{
    // Lire la base de données
    try {
      const data = await getDocs(moviesCollectionRef);
      // console.log(data);
      const filteredData = data.docs.map((doc)=>({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(()=>{
    getMovieList();
  },[])
  // Nouveau film
  const enregistrerFilm = async()=>{
    try {      
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle, 
        realeseDate: newMovieDate, 
        receivedAnOscar: newMovieOscar,
        userId: auth?.currentUser?.uid,
      })
      getMovieList();
    } catch (err) {
      console.error(err)
    }
  }
  // Supprimer un film
  const deleteMovie = async(id)=>{
    const movieDoc = doc(db,"movies",id);
    await deleteDoc(movieDoc)
    getMovieList();
  }
  // Modifier un film
  const modifierTitre = async(id)=>{
    const movieDoc = doc(db,"movies",id);
    await updateDoc(movieDoc,{title: updateTitle})
    getMovieList();
  }

  // Télécharger un fichier
  const telecharger = async()=>{
    if(!fileUpload){return};
    const filesFolderRef = ref(storage,`projectFiles/${date}`);
    try{
      await uploadBytes(filesFolderRef, fileUpload);
    }catch (err){
      console.error(err);
    }
  }

  // console.log('User : ',auth.currentUser.uid);

  return (
    <div className='cours__firebase'>
      <h1>Cours Firebase</h1>
      <h2>Authentification</h2>
      {(auth?.currentUser?.uid? <h2>Connecté</h2> : <h2>Déconnecté</h2>)}
      <Auth/>
<hr />
{/* Nouveau film */}
      <div>
        <h2>Ajout de films</h2>
        <input type="text" name="" id="" placeholder='Titre du film ...' onChange={(e)=>setNewMovieTitle(e.target.value)} />
        <input type="number" name="" id="" placeholder='Date ...' onChange={(e)=>setNewMovieDate(Number(e.target.value))} />
        <input type="checkbox" checked={newMovieOscar} id="oscar" onChange={(e)=>setNewMovieOscar(e.target.checked)} />
        <label htmlFor="oscar">A t'il un Oscar ?</label>
        <button onClick={enregistrerFilm}>Enregistrer le film</button>
      </div>
<hr />
{/* Liste des films */}
      <div>
        <h2>liste des films</h2>
        {movieList.map((movie)=>(
          <div>
            <h3 style={{color: movie.receivedAnOscar ? "green" : "red"}}>{movie.title}</h3>
            <p> Date : {movie.realeseDate} </p>
            <button onClick={()=>deleteMovie(movie.id)}>Supprimer le film</button>
            <input type="text" placeholder='Nouveau titre ..' onChange={(e)=>setUpdateTitle(e.target.value)} defaultValue={movie.title} />
            <button onClick={()=>modifierTitre(movie.id)}>Modifier</button>
          </div>
        ))}
      </div>
<hr />
{/* Storage */}
      <div>
        <h2>Stockage</h2>
        <input type="file" onChange={(e)=> setFileUpload(e.target.files[0])} />
        <button onClick={telecharger}>Enregistrer</button>
      </div>

    </div>
  )
}

export default App
