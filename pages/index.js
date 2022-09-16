import Head from 'next/head'
import { useState, useEffect } from 'react'
import { Button } from 'primereact/button';
import styles from '../styles/Home.module.css'
import { Image } from 'primereact/image';
 

export default function Home() {
  const [catalogue, setCatalogue] = useState({});
  const [cataloguePictures, setCataloguePictures] = useState([]);
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY || '82a1b9d2-59ec-413d-9695-820d217d7caa';
  const CATALOGUE_ID = process.env.NEXT_PUBLIC_CATALOGUE_ID || '630fbf59ff802da0130683de';


  useEffect(() => {
    fetch('https://picknickapi2.herokuapp.com/api/catalogues/details/' + CATALOGUE_ID, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'api_key': API_KEY
      }
    })
      .then(res => res.json())
      .then(data => {
        setCatalogue(data[0]);
        setCataloguePictures(data[0].pictures);
      })
      .catch(err => console.log(err));
  }, []);


  return (
    <div className={styles.container}>
      <Head>
        <title>Test App</title>
        <meta name="description" content="Catalogue test app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {/* List pictures */}

        <div className="surface-0">
          <div className="text-900 font-bold text-6xl mb-4 ">
            {catalogue.title}
          </div>
          <div className="text-700 text-xl mb-6 line-height-3">
            {catalogue.information}
          </div>

          <div className="grid">
            { cataloguePictures  && cataloguePictures.map((picture, index) => (
               <div key = {index} className="col-12 lg:col-4">
               <div className="p-3 h-full">
                 <div className="shadow-2 p-3 h-full flex flex-column" style={{ borderRadius: '6px' }}>
                   <div className="text-900 font-medium text-xl mb-2">
                      {picture.title}
                   </div>
                   <div className="text-600">
                      {picture.barcode}
                   </div>
                   <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                   {/* image */}
                    <div className="flex align-items-center justify-content-center">
                      <Image src={picture.imgurl}  imageClassName="max-w-full"/>
                    </div>
                   <hr className="mb-3 mx-0 border-top-1 border-bottom-none border-300 mt-auto" />
                   <Button label="Buy Now" className="p-3 w-full mt-auto" />
                 </div>
               </div>
             </div>
            ))}

          </div>
        </div>

      </main>

      <footer>
        I am footer
      </footer>
    </div>
  )
}
