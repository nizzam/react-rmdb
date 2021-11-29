import { useState, useEffect } from 'react';
//  API
import API from '../API';
//  Helpers
import { isPersistedState } from '../helpers';

const initialState = {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0
};

export const useHomeFetch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [state, setState] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const fetchMovies = async (searchTerm = "", page) => {
        try {
            setError(false);
            setLoading(true);

            const movies = await API.fetchMovies(searchTerm, page);
            
            setState(prev => ({
                ...movies,
                results:
                    page > 1 ? [...prev.results, ...movies.results]: [...movies.results]
            }));

        } catch (error) {
            setError(true);
        }
        setLoading(false);
    };

    //  Initial render
    // useEffect(() => {
    //     fetchMovies(1);
    // }, []);

    //  Search and Initial Render
    useEffect(() => {
        if (!searchTerm) {
            const sessionState = isPersistedState('homeState');

            if (sessionState) {
                console.log('Fetch from Session')
                setState(sessionState);
                return;
            }
        }

        console.log('Fetch from API')
        setState(initialState);
        fetchMovies(searchTerm, 1);
    }, [searchTerm]);

    //  Load More
    useEffect(() => {
        if (!isLoadingMore) return;
        
        fetchMovies(searchTerm, state.page + 1);
        setIsLoadingMore(false);
    }, [isLoadingMore, searchTerm, state.page]);

    //  Write to sessionStorage
    useEffect(() => {
        if (!searchTerm) sessionStorage.setItem('homeState', JSON.stringify(state))
    }, [searchTerm, state])

    return { state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore };
};