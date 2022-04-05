const test = require('ava')

const { scaleLinear } = require('./scale')

test('should correctly scale', t => {
  // Arrange
  const expected = 10
  const input = 10
  const scale = scaleLinear({ domain: [0, 100], range: [0, 100] })
  // Act
  const actual = scale(input)
  // Assert
  t.is(actual, expected)
});

test('should correctly scale down', t => {
  // Arrange
  const expected = 2
  const input = 20
  const scale = scaleLinear({ domain: [0, 10], range: [0, 100] })
  // Act
  const actual = scale(input)
  // Assert
  t.is(actual, expected)
});

test('should correctly scale up', t => {
  // Arrange
  const expected = 20
  const input = 2
  const scale = scaleLinear({ domain: [0, 100], range: [0, 10] })
  // Act
  const actual = scale(input)
  // Assert
  t.is(actual, expected)
});

