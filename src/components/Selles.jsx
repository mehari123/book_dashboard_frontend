import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import Loading from '../Loading';

import { analytics, app, db, firestore } from '../config/firebase';
import { doc, collection, getDocs, deleteDoc,  updateDoc} from 'firebase/firestore';
import { getDatabase } from "firebase/database";

const Selles = () => {

  const [selles, setSells] = useState([]);
  const [loading, setLoading] = useState(false)

  //fetch the selles data in the api  and use selles1 instead of selles
 useEffect(() => {
        const fetchSells = async () => {
            try {
                setLoading(true);
                const booksCollection = collection(db, 'sells')
                const sellsSnapShoot = await getDocs(booksCollection);
                console.log(sellsSnapShoot)
                const sellList = sellsSnapShoot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
            
                setSells(sellList);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching books:', error);
                setLoading(false);
            }
        };

        fetchSells();
    }, []);


  return (
    <div className='pt-5' >
      {loading && <Loading />}
      <Link to={`/sells/`} className='bg-slate-600  text-green-400  px-4 p-3 rounded-md  text-center cursor-pointer'
      >Sold Books </Link>
      <div className="flex flex-col  mt-4">
        <div className='p-4  border-slate-500 border-t-4  shadow-2xl rounded-lg mt-4'>
          <table className='w-full h-full mt-5 text-center  '>
            <tbody className='justify-around py-10 '>
              <tr className='text-slate-600 text-md bg-slate-300  shadow-md font-bold pt-4' style={{ textAlign: "start" }}>
                <td>sell_id </td>
                <td>title</td>
                <td>author</td>
                <td>price</td>
                <td>phone</td>
                <td>status</td>
              </tr>
              {selles
                && selles
                  .map((book) => (
                    < >
                      <tr key={book.sell_id} className=' py-10 mb-10 text-slate-500 ' style={{ textAlign: "start", margin: 32 }}>
                        <td>{book.sell_id}</td>
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td>{book.price}</td>
                        <td>{book.phone}</td>
                        {book.status === 'available' ? <td className='text-green-500 font-bold'>{book.status}</td> :
                          <td className='text-yellow-500 font-bold'>{book.status}</td>
                        }
                      </tr>

                    </>

                  )
                  )
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>

  )
}

export default Selles