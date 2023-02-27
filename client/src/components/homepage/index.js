import React, { useState } from "react";
import {

  Row,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";
import Card from 'react-bootstrap/Card';

import { searchArtworks } from "../../api";

function Homepage({ onLogout }) {
  const [isLoading, setIsLoading] = useState(false);
  const [noArtworksFound, setNoArtworksFound] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [artworks, setArtworks] = useState([]);

  const onChangeKeyword = (event) => {
    setKeyword(event.target.value);
  };

  const onSearchArtworks = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const artworks = await searchArtworks({ keyword });
    setArtworks(artworks);
    setNoArtworksFound(!artworks || !artworks.length);
    setIsLoading(false);
  };

  return (
    <div>
      <Row className="mt-2 mb-2 justify-content-end">
        <Button variant="outline-danger" onClick={onLogout}>
          Log out
        </Button>
      </Row>
      <Row>
        <h1>Welcome!</h1>
      </Row>
      <Row className="mt-2">
        <h6>
          Enter one or multiple keywords below to search for artworks in the Art
          Institute of Chicago.
        </h6>
      </Row>
      <Row>
        <form className="w-100 mb-5" onSubmit={onSearchArtworks}>

          <input
            type="text"
            placeholder="e.g. Monet, O'Keeffe, Ancient Greek..."
            onChange={onChangeKeyword}
            value={keyword}
          />

          <Button
            variant="outline-primary"
            disabled={!keyword}
            type="submit"
          >
            Search artworks
          </Button>
        </form>
      </Row>
      {isLoading && (
        <Row className="justify-content-center mb-5">
          <Spinner animation="border" variant="primary" />
        </Row>
      )}
      {noArtworksFound && !isLoading ? (
        <Alert variant={"info"}>
          No results were found for the entered keyword/s.
        </Alert>
      ) : (
        <div>
          {artworks.map((artwork, idx) => {
            const {
              id,
              title,
              image_url,
              artist_display,
              date_display,
              medium_display,
              place_of_origin,
            } = artwork;
            return (
              <Card key={`artwork-${id}`}>
                <a
                  href={image_url}
                  target="_blank"
                  rel="noreferrer"
                  aria-current="true"
                >
                  <img variant="top" src={image_url} alt="img" />
                </a>
                <div>
                  <div>{title}</div>
                  <div
                    className="text-muted"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {place_of_origin}, {date_display}
                    <br />
                    <small className="text-muted">{artist_display}</small>
                  </div>
                  <div>
                    <small className="text-muted">{medium_display}</small>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Homepage;