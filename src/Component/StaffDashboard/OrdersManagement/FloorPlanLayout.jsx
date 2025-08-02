import React from 'react';

const FloorPlanLayout = () => {
  return (
    <div style={{
      backgroundColor: '#8B7355',
      minHeight: '100vh',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ display: 'flex', height: '600px', gap: '20px' }}>

        {/* Left Kitchen/Service Area */}
        <div style={{ width: '280px' }}>
          {/* Main Kitchen Area */}
          <div style={{
            backgroundColor: '#5A5A5A',
            height: '480px',
            borderRadius: '8px',
            padding: '15px',
            marginBottom: '15px',
            border: '3px solid #4A4A4A'
          }}>
            {/* Top Equipment Row */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
              <div style={{
                backgroundColor: '#6B6B6B',
                width: '45px',
                height: '80px',
                borderRadius: '4px',
                border: '2px solid #3A3A3A'
              }}></div>
              <div style={{
                backgroundColor: '#6B6B6B',
                width: '45px',
                height: '80px',
                borderRadius: '4px',
                border: '2px solid #3A3A3A'
              }}></div>
              <div style={{
                backgroundColor: '#6B6B6B',
                width: '45px',
                height: '80px',
                borderRadius: '4px',
                border: '2px solid #3A3A3A'
              }}></div>
              <div style={{
                backgroundColor: '#6B6B6B',
                width: '45px',
                height: '80px',
                borderRadius: '4px',
                border: '2px solid #3A3A3A'
              }}></div>
            </div>

            {/* Large Equipment/Counter */}
            <div style={{
              backgroundColor: '#6B6B6B',
              height: '120px',
              borderRadius: '6px',
              border: '3px solid #3A3A3A',
              marginBottom: '20px'
            }}></div>

            {/* Circular Elements (Burners) */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '15px',
              marginBottom: '25px'
            }}>
              <div style={{
                width: '35px',
                height: '35px',
                backgroundColor: '#E8E8E8',
                borderRadius: '50%',
                border: '2px solid #CCCCCC'
              }}></div>
              <div style={{
                width: '35px',
                height: '35px',
                backgroundColor: '#E8E8E8',
                borderRadius: '50%',
                border: '2px solid #CCCCCC'
              }}></div>
            </div>

            {/* Bottom Equipment */}
            <div style={{
              backgroundColor: '#6B6B6B',
              height: '100px',
              borderRadius: '6px',
              border: '3px solid #3A3A3A'
            }}></div>
          </div>

          {/* Storage/Utility Area */}
          <div style={{
            backgroundColor: '#C4A574',
            height: '105px',
            borderRadius: '6px',
            border: '2px solid #B8956B',
            padding: '10px'
          }}>
            <div style={{
              backgroundColor: '#E6C085',
              width: '60px',
              height: '45px',
              borderRadius: '3px',
              border: '1px solid #D4A574'
            }}></div>
          </div>
        </div>

        {/* Main Dining Area */}
        <div style={{ flex: 1 }}>
          {/* Top Row - Plants and Large Oval Table */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            marginBottom: '40px',
            height: '140px'
          }}>
            {/* Left Plant */}
            <div style={{
              width: '70px',
              height: '70px',
              backgroundColor: '#4CAF50',
              borderRadius: '50%',
              marginRight: '40px',
              marginTop: '20px',
              position: 'relative',
              border: '3px solid #45A049'
            }}>
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '45px',
                height: '45px',
                backgroundColor: '#66BB6A',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'black',
                fontWeight: 'bold',
                fontSize: '16px'
              }}>
                1
              </div>
            </div>

            {/* Right Plant */}
            <div style={{
              width: '70px',
              height: '70px',
              backgroundColor: '#4CAF50',
              borderRadius: '50%',
              marginRight: '40px',
              marginTop: '20px',
              position: 'relative',
              border: '3px solid #45A049'
            }}>
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '45px',
                height: '45px',
                backgroundColor: '#66BB6A',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'black',
                fontWeight: 'bold',
                fontSize: '16px'
              }}>
                2
              </div>
            </div>


            {/* Large Oval Table */}
            <div style={{
              width: '260px',
              height: '140px',
              backgroundColor: '#7BA3E0',
              borderRadius: '70px',
              position: 'relative',
              border: '3px solid #6B8FD1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              fontWeight: 'bold',
              color: 'black'
            }}>
              3
              {/* Top seats */}
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={`top-${i}`} style={{
                  position: 'absolute',
                  width: '24px',
                  height: '16px',
                  backgroundColor: '#5577BB',
                  borderRadius: '4px',
                  top: '-20px',
                  left: `${30 + i * 40}px`,
                  border: '1px solid #4466AA',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '10px',
                  fontWeight: 'bold'
                }}>

                </div>
              ))}

              {/* Bottom seats */}
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={`bottom-${i}`} style={{
                  position: 'absolute',
                  width: '24px',
                  height: '16px',
                  backgroundColor: '#5577BB',
                  borderRadius: '4px',
                  bottom: '-20px',
                  left: `${30 + i * 40}px`,
                  border: '1px solid #4466AA',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '10px',
                  fontWeight: 'bold'
                }}>

                </div>
              ))}

              {/* Left seats */}
              {[0, 1].map((i) => (
                <div key={`left-${i}`} style={{
                  position: 'absolute',
                  width: '16px',
                  height: '24px',
                  backgroundColor: '#5577BB',
                  borderRadius: '4px',
                  left: '-20px',
                  top: `${40 + i * 30}px`,
                  border: '1px solid #4466AA',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '10px',
                  fontWeight: 'bold'
                }}>

                </div>
              ))}

              {/* Right seats */}
              {[0, 1].map((i) => (
                <div key={`right-${i}`} style={{
                  position: 'absolute',
                  width: '16px',
                  height: '24px',
                  backgroundColor: '#5577BB',
                  borderRadius: '4px',
                  right: '-20px',
                  top: `${40 + i * 30}px`,
                  border: '1px solid #4466AA',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '10px',
                  fontWeight: 'bold'
                }}>

                </div>
              ))}
            </div>

          </div>

          {/* Table Grid - 3 rows of 3 tables each */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '60px 80px',
            paddingLeft: '40px'
          }}>
            {/* Tables 4-12 */}
            {[4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((tableNum) => (
              <div key={tableNum} style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <div style={{ position: 'relative' }}>
                  {/* Table */}
                  <div style={{
                    width: '80px',
                    height: '80px',
                    backgroundColor: '#D4C4A8',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: '#333',
                    border: '2px solid #C4B498'
                  }}>
                    {tableNum}
                  </div>

                  {/* Chairs around table */}
                  {/* Top chairs */}
                  {[0, 1].map((i) => (
                    <div key={`top-${i}`} style={{
                      position: 'absolute',
                      width: '22px',
                      height: '14px',
                      backgroundColor: '#5577BB',
                      borderRadius: '3px',
                      top: '-18px',
                      left: `${18 + i * 26}px`,
                      border: '1px solid #4466AA'
                    }}></div>
                  ))}

                  {/* Bottom chairs */}
                  {[0, 1].map((i) => (
                    <div key={`bottom-${i}`} style={{
                      position: 'absolute',
                      width: '22px',
                      height: '14px',
                      backgroundColor: '#5577BB',
                      borderRadius: '3px',
                      bottom: '-18px',
                      left: `${18 + i * 26}px`,
                      border: '1px solid #4466AA'
                    }}></div>
                  ))}

                  {/* Left chairs */}
                  {[0, 1].map((i) => (
                    <div key={`left-${i}`} style={{
                      position: 'absolute',
                      width: '14px',
                      height: '22px',
                      backgroundColor: '#5577BB',
                      borderRadius: '3px',
                      left: '-18px',
                      top: `${18 + i * 26}px`,
                      border: '1px solid #4466AA'
                    }}></div>
                  ))}

                  {/* Right chairs */}
                  {[0, 1].map((i) => (
                    <div key={`right-${i}`} style={{
                      position: 'absolute',
                      width: '14px',
                      height: '22px',
                      backgroundColor: '#5577BB',
                      borderRadius: '3px',
                      right: '-18px',
                      top: `${18 + i * 26}px`,
                      border: '1px solid #4466AA'
                    }}></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Drinking Zone */}
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        paddingRight: '40px'
      }}>
        <div style={{ position: 'relative' }}>
          {/* Bar Table */}
          <div style={{
            width: '160px',
            height: '60px',
            backgroundColor: '#8B4513',
            borderRadius: '8px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#FFF',
            border: '3px solid #654321',
            boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}>
            DRINKING ZONE
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloorPlanLayout;