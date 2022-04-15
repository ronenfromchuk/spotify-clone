import React, { useEffect, useState } from 'react';
import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  RssIcon,
  HeartIcon,
} from '@heroicons/react/outline';
import { signOut, useSession } from 'next-auth/react';
import useSpotify from '../hooks/useSpotify';
import { useRecoilState } from 'recoil';
import { playlistIdState } from '../atoms/playlistAtom';

function Sidebar() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
  console.log('you picked this playlist >>>', playlistId)

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);
  

  return (
    <div className='text-gray-500 p-5 text-sm lg:text-sm border-r
    border-gray-900 overflow-y-scroll scrollbar-hide h-screen sm:max-w-[12rem]
    lg:max-w-[15rem] hidden md:inline-flex pb-36'>        
        <div className='space-y-4'>          
          <button className='flex items-center space-x-2 hover:text-white text-white'>
            <HomeIcon className='h-5 w-5 '/>
            <p>Home</p>
          </button>
          <button className='flex items-center space-x-2 hover:text-white text-orange-500' >
            <SearchIcon className='h-5 w-5' />
            <p>Search</p>
          </button>
          <button className='flex items-center space-x-2 hover:text-white text-yellow-500'>
            <LibraryIcon className='h-5 w-5'/>
            <p>Your Library</p>
          </button>     
          <hr className='border-t-[0.1px] border-gray-900' />
          <button className='flex items-center space-x-2 hover:text-white text-red-300'>
            <PlusCircleIcon className='h-5 w-5' />
            <p>Create Playlist</p>
          </button>
          <button className='flex items-center space-x-2 hover:text-white text-blue-500'>
            <HeartIcon className='h-5 w-5' />
            <p>Liked Songs</p>
          </button>
          <button className='flex items-center space-x-2 hover:text-white text-green-700'>
            <RssIcon className='h-5 w-5' />
            <p>Your episods</p>
          </button>     
          <hr className='border-t-[0.1px] border-gray-900' />

        {/* Playlist */}
        {playlists.map((playlist) => (
          <p key={playlist.id} onClick={() => setPlaylistId(playlist.id)} className='cursor-pointer hover:text-white'>{playlist.name}</p>
        ))}

        </div>
    </div>
  );
}

export default Sidebar;